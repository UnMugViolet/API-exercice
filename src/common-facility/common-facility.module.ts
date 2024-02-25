import { Module } from '@nestjs/common';
import { CommonFacilityService } from './common-facility.service';
import { CommonFacilityController } from './common-facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFacilityEntity } from './entities/common-facility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonFacilityEntity])],
  providers: [CommonFacilityService],
  controllers: [CommonFacilityController],
  exports: [CommonFacilityService],
})
export class CommonFacilityModule {}