import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

export class CreateSubscriptionDto {
  @IsUUID()
  planId!: string;

  @IsString()
  userId!: string; // más adelante vendrá del token JWT, por ahora lo pedimos

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus = SubscriptionStatus.ACTIVE;
}
