import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from './entities/owner.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  create(createOwnerDto: CreateOwnerDto) {
    const newOwner = this.ownerRepository.create(createOwnerDto as DeepPartial<OwnerEntity>);
    return this.ownerRepository.save(newOwner);
  }

  findAll() {
    return this.ownerRepository.find();
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
