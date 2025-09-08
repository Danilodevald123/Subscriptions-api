// src/plans/plans.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreatePlanDto, PlanInterval } from './dto/create-plan.dto';

export type Plan = {
  id: string;
  name: string;
  interval: PlanInterval;
  priceCents: number;
  currency: string;
  active: boolean;
  createdAt: string;
};

@Injectable()
export class PlansService {
  private plans: Plan[] = [];

  create(dto: CreatePlanDto): Plan {
    // Normalizamos moneda a MAYÚSCULAS (ej: "ars" -> "ARS")
    const plan: Plan = {
      id: randomUUID(),
      name: dto.name.trim(),
      interval: dto.interval,
      priceCents: dto.priceCents,
      currency: dto.currency.toUpperCase(),
      active: dto.active ?? true,
      createdAt: new Date().toISOString(),
    };
    this.plans.push(plan);
    return plan;
  }

  findAll(): Plan[] {
    // Podríamos paginar más adelante; por ahora devolvemos todo
    return this.plans;
  }

  findOne(id: string): Plan {
    const found = this.plans.find((p) => p.id === id);
    if (!found) throw new NotFoundException('Plan not found');
    return found;
  }
}
