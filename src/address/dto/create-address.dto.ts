import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({example: 123})
  @IsNotEmpty()
  @IsString()
  streetNumber: number;

  @ApiProperty({example: 'Bis'})
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({example: 'Rue de la Paix'})
  @IsNotEmpty()
  @IsString()
  streetName: string;

  @ApiProperty({example: 'Paris'})
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({example: '75000'})
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}