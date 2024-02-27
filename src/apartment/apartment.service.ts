import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentEntity } from './entities/apartment.entity';


@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>
  ) {}

  async create(createApartmentDto: CreateApartmentDto) : Promise<ApartmentEntity>{
    const newApartment = this.apartmentRepository.create(createApartmentDto as DeepPartial<ApartmentEntity>);
    return this.apartmentRepository.save(newApartment);
  }

  findAll() {
    return this.apartmentRepository.find();
  }

  async findOne(id: number): Promise<ApartmentEntity> {
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto) : Promise<ApartmentEntity>{
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    Object.assign(apartment, updateApartmentDto);
    return this.apartmentRepository.save(apartment);
  }

  remove(id: number) {
    return this.apartmentRepository.delete(id);
  }
}
