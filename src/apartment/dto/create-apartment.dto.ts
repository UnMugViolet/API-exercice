import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBuildingDto } from 'src/building/dto/create-building.dto';
import { CreateOwnerDto } from 'src/owner/dto/create-owner.dto';
import { CreateOptionDto } from 'src/option/dto/create-option.dto';
import { CreateTenantDto } from 'src/tenant/dto/create-tenant.dto';
import { CreateApartmentTypeDto } from 'src/apartment-type/dto/create-apartment-type.dto';

export class CreateApartmentDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  doorNumber: string;

  @ApiProperty()
  @IsNumber()
  floorArea: number;

  @ApiProperty()
  @IsNumber()
  rent: number;

  @ApiPropertyOptional({ type: () => CreateBuildingDto })
  @IsOptional()
  building: CreateBuildingDto;

  @ApiPropertyOptional({ type: () => CreateOwnerDto })
  @IsOptional()
  owner: CreateOwnerDto;

  @ApiPropertyOptional({ type: () => [CreateOptionDto] })
  @IsOptional()
  @IsArray()
  options: CreateOptionDto[];

  @ApiPropertyOptional({ type: () => [CreateTenantDto] })
  @IsOptional()
  @IsArray()
  tenants: CreateTenantDto[];

  @ApiPropertyOptional({ type: () => CreateApartmentTypeDto })
  @IsOptional()
  apartmentType: CreateApartmentTypeDto;
}