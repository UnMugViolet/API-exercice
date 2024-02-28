import { ApiProperty } from '@nestjs/swagger';

export class AssignAddressToBuildingDto {
  @ApiProperty()
  addressId: number;
}
