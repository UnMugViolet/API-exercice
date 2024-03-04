import { ApiProperty } from '@nestjs/swagger';

export class AssignApartmentToBuildingDto {
  @ApiProperty({ example: 1})
  apartmentId: number;
}
