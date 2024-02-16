import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateBuildingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buildingDate: Date;
  
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
  @IsString()
  commonFacilityToBuilding: string;
}
