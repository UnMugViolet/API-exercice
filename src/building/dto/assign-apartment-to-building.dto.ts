import { ApiProperty } from '@nestjs/swagger';

export class AssignApartmentToBuildingDto {
  @ApiProperty()
  apartmentId: number;
}
