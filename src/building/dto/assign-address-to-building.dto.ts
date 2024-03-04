import { ApiProperty } from '@nestjs/swagger';

export class AssignAddressToBuildingDto {
  @ApiProperty({ example: 1})
  addressId: number;
}
