import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';
import { CreateCommonFacilityDto } from 'src/common-facility/dto/create-common-facility.dto';

export class CreateCommonFacilityToBuildingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  commonFacility: CreateCommonFacilityDto;

  @ApiProperty()
  @IsNotEmpty()
  building: CreateBuildingDto;
}
