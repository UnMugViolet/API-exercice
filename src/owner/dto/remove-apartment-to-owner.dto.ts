import { ApiProperty } from "@nestjs/swagger";

export class RemoveApartmentFromOwnerDto {
  @ApiProperty({ example: 1})
  apartmentId: number;
}