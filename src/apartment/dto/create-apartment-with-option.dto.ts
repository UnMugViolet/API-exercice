import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentWitOptionDto {

  @ApiProperty({ example: '1'})
  apartmentId: number;

  @ApiProperty({ example: [1, 2]})
  optionIds: number[];
  
}