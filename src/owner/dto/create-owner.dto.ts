import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreatePersonDto } from "src/person/dto/create-person.dto";

export class CreateOwnerDto extends CreatePersonDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsBoolean()
  isSubjectToVat: boolean;
}
