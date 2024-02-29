import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';
import { ApartmentEntity } from 'src/apartment/entities/apartment.entity';
import { AddressEntity } from 'src/address/entities/address.entity';
import { CommonFacilityEntity } from 'src/common-facility/entities/common-facility.entity';
import { CommonFacilityToBuildingEntity } from 'src/common-facility-to-building/entities/common-facility-to-building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BuildingEntity, ApartmentEntity, AddressEntity, CommonFacilityEntity, CommonFacilityToBuildingEntity])],
  providers: [BuildingService],
  controllers: [BuildingController],
  exports: [BuildingService],
})
export class BuildingModule {}
