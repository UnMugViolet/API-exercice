import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreatePersonDto } from "src/person/dto/create-person.dto";

export class CreateOwnerDto extends CreatePersonDto {
  @ApiProperty({ example: 'FR1234567890' })
  @IsString()
  bankAccountNumber: string;

  @ApiProperty({ example: true})
  @IsBoolean()
  isVATpayer: boolean;
}
