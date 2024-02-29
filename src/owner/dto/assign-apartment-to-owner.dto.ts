import { ApiProperty } from "@nestjs/swagger";

export class AssignApartmentToOwnerDto {
  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  apartmentId: number;
}