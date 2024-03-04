import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';
import { CreateCommonFacilityDto } from 'src/common-facility/dto/create-common-facility.dto';

export class CreateCommonFacilityToBuildingDto {
  @ApiProperty({ example: '2024-03-04T10:51:00.647Z'})
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ example: 'CommonFacilityToBuilding name'})
  @IsNotEmpty()
  commonFacility: CreateCommonFacilityDto;

  @ApiProperty({ example: 'Building name'})
  @IsNotEmpty()
  building: CreateBuildingDto;
}
