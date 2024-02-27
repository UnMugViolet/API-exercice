import { Module } from '@nestjs/common';
import { CommonFacilityToBuildingService } from './common-facility-to-building.service';
import { CommonFacilityToBuildingController } from './common-facility-to-building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFacilityToBuildingEntity } from './entities/common-facility-to-building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonFacilityToBuildingEntity])],
  providers: [CommonFacilityToBuildingService],
  controllers: [CommonFacilityToBuildingController],
  exports: [CommonFacilityToBuildingService],
})
export class CommonFacilityToBuildingModule {}
