import { Injectable } from '@nestjs/common';
import { CreateCommonFacilityToBuildingDto } from './dto/create-common-facility-to-building.dto';
import { UpdateCommonFacilityToBuildingDto } from './dto/update-common-facility-to-building.dto';

@Injectable()
export class CommonFacilityToBuildingService {
  create(createCommonFacilityToBuildingDto: CreateCommonFacilityToBuildingDto) {
    return 'This action adds a new commonFacilityToBuilding';
  }

  findAll() {
    return `This action returns all commonFacilityToBuilding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commonFacilityToBuilding`;
  }

  update(id: number, updateCommonFacilityToBuildingDto: UpdateCommonFacilityToBuildingDto) {
    return `This action updates a #${id} commonFacilityToBuilding`;
  }

  remove(id: number) {
    return `This action removes a #${id} commonFacilityToBuilding`;
  }
}
