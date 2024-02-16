import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateCommonFacilityDto } from 'src/common-facility/dto/create-common-facility.dto';

export class CreateBuildingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buildingCreationDate: Date;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: CreateAddressDto;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apartments: string;
  
  @ApiProperty()
  @IsNotEmpty()
  commonFacilityToBuilding: CreateCommonFacilityDto[];
}
