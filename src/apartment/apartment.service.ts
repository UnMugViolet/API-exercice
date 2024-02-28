import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { CreateApartmentWithOwnerDto } from './dto/create-apartment-with-owner.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentTypeService } from 'src/apartment-type/apartment-type.service';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';
import { OwnerEntity } from 'src/owner/entities/owner.entity';


@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>,
    @InjectRepository(ApartmentTypeEntity)
    private readonly apartmentTypeRepository: Repository<ApartmentTypeEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
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

  async createApartmentWithOwner(createApartmentWithOwnerDto: CreateApartmentWithOwnerDto) {
    if (!createApartmentWithOwnerDto.ownerId) {
      throw new BadRequestException('Owner is required');
    }
    const owner = await this.ownerRepository.findOne({ where: { id: createApartmentWithOwnerDto.ownerId } });

    if (!owner) {
      throw new BadRequestException('Owner not found');
    }

    const newApartment = this.apartmentRepository.create({
      ...createApartmentWithOwnerDto,
      owner : owner
    });
  }

  findAll() {
    return this.apartmentRepository.find({relations: ['apartmentType', 'owner']});
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
