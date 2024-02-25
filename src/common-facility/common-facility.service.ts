import { Injectable } from '@nestjs/common';
import { CreateCommonFacilityDto } from './dto/create-common-facility.dto';
import { UpdateCommonFacilityDto } from './dto/update-common-facility.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonFacilityEntity } from './entities/common-facility.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonFacilityService {

  constructor(
    @InjectRepository(CommonFacilityEntity)
    private readonly commonFacilityRepository: Repository<CommonFacilityEntity>
  ) {}

  async create(createCommonFacilityDto: CreateCommonFacilityDto) {
    const newCommonFacility = this.commonFacilityRepository.create(createCommonFacilityDto);
    return await this.commonFacilityRepository.save(newCommonFacility);
  }

  findAll() {
    return this.commonFacilityRepository.find();
  }

  findOne(id: number) {
    return this.commonFacilityRepository.findOne({ where: { id } });;
  }

  async update(id: number, updateCommonFacilityDto: UpdateCommonFacilityDto) {
    const commonFacility = await this.commonFacilityRepository.findOne({ where: { id } });
    Object.assign(commonFacility, updateCommonFacilityDto);
    return this.commonFacilityRepository.save(commonFacility);
  }

  remove(id: number) {
    return this.commonFacilityRepository.delete(id);
  }
}
