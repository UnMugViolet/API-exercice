import { ApiProperty } from '@nestjs/swagger';

export class DeleteTenantFromApartmentDto {
  @ApiProperty({ example: [1, 2, 3]})
  tenantIds: number[];
}
