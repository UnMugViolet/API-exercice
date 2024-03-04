import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional } from "class-validator";

export class CreateCommonFacilityDto {
  @ApiProperty({ example: 'Common Facility name'})
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-03-04T10:57:10.053Z'})
  @IsDate()
  lastInspection: Date;

  @ApiProperty({ example: 'true'})
  isSecure: boolean;
}