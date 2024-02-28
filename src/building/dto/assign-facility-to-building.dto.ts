import { ApiProperty } from '@nestjs/swagger';

export class AssignFacilityToBuildingDto {
  @ApiProperty()
  facilitiesId: number;
}
