import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({ example: 'Option name'})
  @IsString()
  name: string;

  @ApiProperty({ example: 'Option description'})
  @IsString()
  description: string;
}