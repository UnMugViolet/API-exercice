import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  doorNumber: string;

  @ApiProperty()
  @IsNumber()
  floorArea: number;

  @ApiProperty()
  @IsNumber()
  rent: number;

  @ApiProperty()
  apartmentType: number;
}