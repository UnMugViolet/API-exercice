import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { BuildingEntity } from '../../building/entities/building.entity';
import { OptionEntity } from '../../option/entities/option.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { OwnerEntity } from '../../owner/entities/owner.entity';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';

export class CreateApartmentDto {
  @IsString()
  description: string;

  @IsString()
  doorNumber: string;

  @IsNumber()
  floorArea: number;

  @IsOptional()
  @IsNumber()
  building: BuildingEntity;

  @IsOptional()
  @IsNumber()
  owner: OwnerEntity;

  @IsOptional()
  @IsArray()
  options: OptionEntity[];

  @IsOptional()
  @IsArray()
  tenants: TenantEntity[];

  @IsOptional()
  @IsNumber()
  apartmentType: ApartmentTypeEntity;
}