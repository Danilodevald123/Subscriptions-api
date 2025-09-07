import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { PlansController } from './plans/plans.controller';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [PlansModule],
  controllers: [AppController, HealthController, PlansController],
  providers: [AppService],
})
export class AppModule {}
