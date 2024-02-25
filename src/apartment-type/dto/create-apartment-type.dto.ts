import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentTypeDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  maxOccupants: number;
}