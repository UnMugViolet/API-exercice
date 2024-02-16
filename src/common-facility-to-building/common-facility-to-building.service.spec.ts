import { Test, TestingModule } from '@nestjs/testing';
import { CommonFacilityToBuildingService } from './common-facility-to-building.service';

describe('CommonFacilityToBuildingService', () => {
  let service: CommonFacilityToBuildingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonFacilityToBuildingService],
    }).compile();

    service = module.get<CommonFacilityToBuildingService>(CommonFacilityToBuildingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
