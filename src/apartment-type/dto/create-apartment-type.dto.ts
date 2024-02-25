import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ApartmentType {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4',
  // Add more apartment types here if needed
}

export class CreateApartmentTypeDto {
  @ApiProperty({ enum: ApartmentType })
  @IsString()
  type: ApartmentType;

  @ApiProperty()
  @IsNumber()
  maxOccupants: number;
}