import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({example: 'Building name'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: '2024-03-04T10:57:10.053Z'})
  @IsNotEmpty()
  @IsString()
  buildingCreationDate: Date;
}
