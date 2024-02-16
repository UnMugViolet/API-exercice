import { Module } from '@nestjs/common';
import { CommonFacilityToBuildingService } from './common-facility-to-building.service';
import { CommonFacilityToBuildingController } from './common-facility-to-building.controller';

@Module({
  controllers: [CommonFacilityToBuildingController],
  providers: [CommonFacilityToBuildingService],
})
export class CommonFacilityToBuildingModule {}
