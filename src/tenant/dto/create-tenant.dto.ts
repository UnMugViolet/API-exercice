import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { CreatePersonDto } from "src/person/dto/create-person.dto";

export class CreateTenantDto extends CreatePersonDto {
  @ApiProperty({ example: true})
  @IsOptional()
  @IsBoolean()
  isMainTenant: boolean;
}
