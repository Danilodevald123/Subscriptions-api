import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  get() {
    return {
      ok: true,
      service: 'subscriptions-api',
      ts: new Date().toISOString(),
    };
  }
}
