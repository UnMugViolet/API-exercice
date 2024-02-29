import { ApiProperty } from "@nestjs/swagger";

export class RemoveApartmentFromOwnerDto {
  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  apartmentId: number;
}