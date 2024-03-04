import { ApiProperty } from '@nestjs/swagger';

export class DeleteTenantFromApartmentDto {
  @ApiProperty()
  tenantIds: number[];
}
