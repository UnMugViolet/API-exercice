import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApartmentTypeEntity } from './entities/apartment-type.entity';

@Injectable()
export class ApartmentTypeService {

  constructor(
    @InjectRepository(ApartmentTypeEntity)
    private readonly apartmentRepository: Repository<ApartmentTypeEntity>
  ) {}


  async create(createApartmentTypeDto: CreateApartmentTypeDto) : Promise<ApartmentTypeEntity>{
    const newApartmentType = this.apartmentRepository.create(createApartmentTypeDto as DeepPartial<ApartmentTypeEntity>);
    return this.apartmentRepository.save(newApartmentType);
  }

  findAll() {
    return this.apartmentRepository.find();
  }

  async findOne(id: number) {
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async findOneByName(type: string) {
    return await this.apartmentRepository.findOne({ where: { type } });
  }

  async update(id: number, updateApartmentTypeDto: UpdateApartmentTypeDto) {
    const apartmentType = await this.apartmentRepository.findOne({ where: { id } });
    Object.assign(apartmentType, updateApartmentTypeDto);
    return this.apartmentRepository.save(apartmentType);
  }

  remove(id: number) {
    return this.apartmentRepository.delete(id);
  }
}
