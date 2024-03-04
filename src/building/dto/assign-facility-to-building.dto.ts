import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AssignFacilityToBuildingDto {
  @ApiProperty({ example: 1})
  facilitiesId: number;
}
