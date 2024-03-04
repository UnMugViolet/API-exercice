import { ApiProperty } from "@nestjs/swagger";

export class RemoveApartmentFromOwnerDto {
  @ApiProperty()
  apartmentId: number;
}