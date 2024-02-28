import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';
import { ApartmentEntity } from 'src/apartment/entities/apartment.entity';
import { AddressEntity } from 'src/address/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BuildingEntity, ApartmentEntity, AddressEntity])],
  providers: [BuildingService],
  controllers: [BuildingController],
  exports: [BuildingService],
})
export class BuildingModule {}
