import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subs: SubscriptionsService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subs.create(dto);
  }

  @Get()
  list(@Query('userId') userId?: string) {
    return this.subs.listByUser(userId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.subs.cancel(id);
  }
}
