import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional } from "class-validator";
import { CreateCommonFacilityToBuildingDto } from "src/common-facility-to-building/dto/create-common-facility-to-building.dto";

export class CreateCommonFacilityDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  lastInspection: Date;
}
