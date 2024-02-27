import { Injectable } from '@nestjs/common';
import { CreateCommonFacilityToBuildingDto } from './dto/create-common-facility-to-building.dto';
import { UpdateCommonFacilityToBuildingDto } from './dto/update-common-facility-to-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonFacilityToBuildingEntity } from './entities/common-facility-to-building.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommonFacilityToBuildingService {

  constructor(
    @InjectRepository(CommonFacilityToBuildingEntity)
    private readonly commonFacilityToBuildingRepository: Repository<CommonFacilityToBuildingEntity>
  ) {}

  async create(createCommonFacilityToBuildingDto: CreateCommonFacilityToBuildingDto) : Promise<CommonFacilityToBuildingEntity>{
    const newCommonFacilityToBuilding = await this.commonFacilityToBuildingRepository.create(createCommonFacilityToBuildingDto as DeepPartial<CommonFacilityToBuildingEntity>);
    return this.commonFacilityToBuildingRepository.save(newCommonFacilityToBuilding);
  }

  findAll() {
    return this.commonFacilityToBuildingRepository.find();
  }

  async findOne(id: number) {
    return await this.commonFacilityToBuildingRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCommonFacilityToBuildingDto: UpdateCommonFacilityToBuildingDto) {
    const commonFacilityToBuilding = await this.commonFacilityToBuildingRepository.findOne({ where: { id } });
    Object.assign(commonFacilityToBuilding, updateCommonFacilityToBuildingDto);
    return this.commonFacilityToBuildingRepository.save(commonFacilityToBuilding);
  }

  remove(id: number) {
    return this.commonFacilityToBuildingRepository.delete(id);
  }
}
