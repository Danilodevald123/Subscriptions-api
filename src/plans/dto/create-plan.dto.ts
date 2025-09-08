// src/plans/dto/create-plan.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export enum PlanInterval {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export class CreatePlanDto {
  // Regla: el nombre debe ser corto y claro
  @IsString()
  @MaxLength(60)
  name!: string;

  // Regla: hoy solo soportamos mensual/anual (se expande fácil a weekly/quarterly)
  @IsEnum(PlanInterval)
  interval!: PlanInterval;

  // Regla: precio > 0, guardado en centavos para evitar errores de redondeo
  @IsInt()
  @IsPositive()
  priceCents!: number;

  // Regla: moneda ISO 3 letras (ej: ARS, USD)
  @IsString()
  @Length(3, 3)
  currency!: string;

  // Regla: un plan puede estar inactivo (no se puede contratar si está inactivo)
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
