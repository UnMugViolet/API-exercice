import { ApiProperty } from "@nestjs/swagger";

export class AssignApartmentToOwnerDto {
  @ApiProperty({ example: 1})
  ownerId: number;

  @ApiProperty({ example: 1})
  apartmentId: number;
}