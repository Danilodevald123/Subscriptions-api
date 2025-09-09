import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdempotencyMiddleware } from './common/middlewares/idempotency.middleware';
import { HealthController } from './health.controller';
import { PlansController } from './plans/plans.controller';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [PlansModule, SubscriptionsModule],
  controllers: [AppController, HealthController, PlansController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdempotencyMiddleware).forRoutes('*');
  }
}
