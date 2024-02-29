import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from './entities/owner.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { ApartmentEntity } from 'src/apartment/entities/apartment.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>,
  ) {}

  create(createOwnerDto: CreateOwnerDto) {
    const newOwner = this.ownerRepository.create(createOwnerDto as DeepPartial<OwnerEntity>);
    return this.ownerRepository.save(newOwner);
  }

  async assignApatmentToOwner(ownerId: number, apartmentId: number) {
    const owner = await this.ownerRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new Error('Owner not found');
    }

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    apartment.owner = owner;

    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  async removeApartmentFromOwner(ownerId: number, apartmentId: number) {
    const owner = await this.ownerRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new Error('Owner not found');
    }

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    apartment.owner = null;

    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  findAll() {
    return this.ownerRepository.find({relations: ['apartments']});
  }

  async findOne(id: number) {
    return await this.ownerRepository.findOne({ where: { id } });
  }

  async findOneByBankAccountNumber(bankAccountNumber: string) {
    return await this.ownerRepository.findOne({ where: { bankAccountNumber } });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerRepository.findOne({ where: { id } });
    Object.assign(owner, updateOwnerDto);
    return this.ownerRepository.save(owner);
  }

  remove(id: number) {
    return this.ownerRepository.delete(id);
  }
}
