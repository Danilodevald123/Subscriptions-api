// src/plans/plans.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreatePlanDto } from './dto/create-plan.dto';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plans: PlansService) {}

  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.plans.create(dto);
  }

  @Get()
  list() {
    return this.plans.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.plans.findOne(id);
  }
}
