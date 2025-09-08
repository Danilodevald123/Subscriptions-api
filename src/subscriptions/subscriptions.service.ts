import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PlansService } from '../plans/plans.service';
import { CreateSubscriptionDto, SubscriptionStatus } from './dto/create-subscription.dto';
export type Subscription = {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startedAt: string;
  canceledAt?: string;
};

@Injectable()
export class SubscriptionsService {
  private subs: Subscription[] = [];

  constructor(private readonly plans: PlansService) {}

  create(dto: CreateSubscriptionDto): Subscription {
    const plan = this.plans.findOne(dto.planId);
    if (!plan.active) throw new BadRequestException('Plan is not active');

    const sub: Subscription = {
      id: randomUUID(),
      userId: dto.userId,
      planId: dto.planId,
      status: dto.status ?? SubscriptionStatus.ACTIVE,
      startedAt: new Date().toISOString(),
    };
    this.subs.push(sub);
    return sub;
  }

  listByUser(userId?: string): Subscription[] {
    return userId ? this.subs.filter((s) => s.userId === userId) : this.subs;
  }

  cancel(id: string): Subscription {
    const sub = this.subs.find((s) => s.id === id);
    if (!sub) throw new NotFoundException('Subscription not found');
    if (sub.status === SubscriptionStatus.CANCELED) return sub;

    sub.status = SubscriptionStatus.CANCELED;
    sub.canceledAt = new Date().toISOString();
    return sub;
  }
}
