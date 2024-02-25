import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OptionType {
  Balcony = 'Balcony',
  PrivateCellar = 'PrivateCellar',
  ParkingPlace = 'ParkingPlace',
}

export class CreateOptionDto {
  @ApiProperty({ enum: OptionType })
  @IsString()
  type: OptionType;

  @ApiProperty()
  @IsString()
  description: string;
}