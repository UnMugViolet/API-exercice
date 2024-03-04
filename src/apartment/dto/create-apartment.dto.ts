import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({ example: 'Wonderful apartment with a great view of the city!'})
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
  apartmentType: number;
}