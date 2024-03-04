import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentWithOwnerDto {
  @ApiProperty({ example: 'Apartment name'})
  @IsString()
  description: string;

  @ApiProperty({ example: '3B'})
  @IsString()
  doorNumber: string;

  @ApiProperty({ example: 1})
  @IsNumber()
  floorArea: number;

  @ApiProperty({ example: 500})
  @IsNumber()
  rent: number;

  @ApiProperty({ example: 1})
  ownerId: number;
}