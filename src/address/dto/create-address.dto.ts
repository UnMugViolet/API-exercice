import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  streetNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  streetName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}