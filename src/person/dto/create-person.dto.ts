import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePersonDto {
  @ApiProperty({ example: 'John'})
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe'})
  @IsString()
  lastName: string;

  @ApiProperty({ example: '0618784003'})
  @IsString()
  phoneNumber: string;
}
