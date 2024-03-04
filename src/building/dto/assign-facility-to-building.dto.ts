import { ApiProperty } from '@nestjs/swagger';

export class AssignFacilityToBuildingDto {
  @ApiProperty({ example: 1})
  facilitiesId: number;
}
