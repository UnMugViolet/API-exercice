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

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(id, updateAddressDto);
  }

  remove(id: number) {
    this.addressRepository.delete(id);
  }
}
