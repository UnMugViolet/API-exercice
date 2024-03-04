import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({example: 'Building name'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: 'Building description'})
  @IsNotEmpty()
  @IsString()
  buildingCreationDate: Date;
}
