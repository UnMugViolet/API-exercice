import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentTypeDto {
  @ApiProperty({ example: 'Myname'})
  @IsString()
  type: string;

  @ApiProperty({ example: 4})
  @IsNumber()
  maxOccupancy: number;
}