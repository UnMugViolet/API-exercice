import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const newAddress = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newAddress);
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return this.addressRepository.findOneBy({id});
  }

  async findOneByStreetNumberAndStreetName(streetNumber: number, streetName: string): Promise<AddressEntity | undefined> {
    return this.addressRepository.findOne({ where: { streetNumber, streetName } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({ where: { id } });
    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}

