import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AssignFacilityToBuildingDto {
  @ApiProperty({ example: [1, 2, 3]})
  @IsArray()
  @IsNumber({}, { each: true })
  facilitiesId: number[];
}