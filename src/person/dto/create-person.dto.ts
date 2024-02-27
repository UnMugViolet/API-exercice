import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePersonDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;
}
