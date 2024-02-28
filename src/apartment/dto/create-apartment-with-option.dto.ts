import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentWitOptionDto {

  @ApiProperty()
  apartmentId: number;

  @ApiProperty()
  optionIds: number[];
  
}