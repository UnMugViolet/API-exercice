import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class BuildingService {

  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>
  ) {}

  create(createBuildingDto: CreateBuildingDto) {
    const newBuilding = this.buildingRepository.create(createBuildingDto as DeepPartial<BuildingEntity>);
    return this.buildingRepository.save(newBuilding); 
  }

  findAll() {
    return this.buildingRepository.find();
  }

  findOne(id: number) {
    return this.buildingRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const building = await this.buildingRepository.findOne({ where: { id } });
    Object.assign(building, updateBuildingDto);
    return this.buildingRepository.save(building);
  }

  remove(id: number) {
    return this.buildingRepository.delete(id);
  }
}
