import { Test, TestingModule } from '@nestjs/testing';
import { CommonFacilityToBuildingController } from './common-facility-to-building.controller';
import { CommonFacilityToBuildingService } from './common-facility-to-building.service';

describe('CommonFacilityToBuildingController', () => {
  let controller: CommonFacilityToBuildingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonFacilityToBuildingController],
      providers: [CommonFacilityToBuildingService],
    }).compile();

    controller = module.get<CommonFacilityToBuildingController>(CommonFacilityToBuildingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
