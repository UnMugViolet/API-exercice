import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentTypeService } from 'src/apartment-type/apartment-type.service';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';


@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>,
    @InjectRepository(ApartmentTypeEntity)
    private readonly apartmentTypeRepository: Repository<ApartmentTypeEntity>
  ) { }

  async create(createApartmentDto: CreateApartmentDto) {
    if (!createApartmentDto.apartmentType) {
      throw new BadRequestException('Apartment type is required');
    }
    const type = await this.apartmentTypeRepository.findOne({ where: { id: createApartmentDto.apartmentType } });

    if (!type) {
      throw new BadRequestException('Apartment type not found');
    }

    const newApartment = this.apartmentRepository.create({
      ...createApartmentDto,
      apartmentType: type
    });
    
    return this.apartmentRepository.save(newApartment);
  }

  findAll() {
    return this.apartmentRepository.find({relations: ['apartmentType']});
  }

  async findOne(id: number): Promise<ApartmentEntity> {
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto): Promise<ApartmentEntity> {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    Object.assign(apartment, updateApartmentDto);
    return this.apartmentRepository.save(apartment);
  }

  remove(id: number) {
    return this.apartmentRepository.delete(id);
  }
}
