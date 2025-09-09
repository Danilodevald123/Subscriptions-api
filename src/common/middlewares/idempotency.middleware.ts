// src/common/idempotency.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { createHash } from 'crypto';
import { NextFunction, Request, Response } from 'express';

type Cached = {
  status: number;
  body: unknown;
  ts: number;
  bodyHash: string;
  route: string;
  method: string;
  userScope: string;
};

const CACHE = new Map<string, Cached>();
const TTL_MS = 15 * 60 * 1000; // 15 min

function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'POST') return next();

    const key = req.header('Idempotency-Key');
    if (!key) return next();

    const userScope = (req.header('x-user-id') ?? 'anon').toString(); // ajustá cuando tengas auth real
    const cacheKey = `${userScope}|${key}|${req.method}|${req.path}`;

    const now = Date.now();
    const bodyString = JSON.stringify(req.body ?? {});
    const bodyHash = sha256(bodyString);

    const cached = CACHE.get(cacheKey);
    if (cached && now - cached.ts < TTL_MS) {
      // misma key, verificamos que el payload sea idéntico
      if (cached.bodyHash !== bodyHash) {
        return res.status(409).json({
          error: 'IdempotencyConflict',
          message:
            'This Idempotency-Key was already used with different request payload. Use a new key for a new operation.',
          details: {
            route: cached.route,
            method: cached.method,
          },
        });
      }
      res.setHeader('Idempotent-Replay', 'true');
      return res.status(cached.status).json(cached.body);
    }

    const originalJson = res.json.bind(res) as (body?: any) => Response;
    res.json = (body: any) => {
      CACHE.set(cacheKey, {
        status: res.statusCode,
        body,
        ts: now,
        bodyHash,
        route: req.path,
        method: req.method,
        userScope,
      });
      return originalJson(body);
    };

    next();
  }
}
