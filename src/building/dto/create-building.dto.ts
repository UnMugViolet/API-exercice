import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateApartmentDto } from 'src/apartment/dto/create-apartment.dto';
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
  address: CreateAddressDto;
  
  @ApiProperty({ type: () => [CreateApartmentDto] })
  @IsNotEmpty()
  apartments: CreateApartmentDto[];

  @ApiProperty({ type: () => [CreateCommonFacilityDto] })
  @IsNotEmpty()
  commonFacilityToBuilding: CreateCommonFacilityDto[];
}
