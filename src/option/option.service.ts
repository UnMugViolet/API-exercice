import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OptionEntity } from './entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  create(createOptionDto: CreateOptionDto) {
    const newOption = this.optionRepository.create(
      createOptionDto as DeepPartial<OptionEntity>,
    );
    return this.optionRepository.save(newOption);
  }

  findAll() {
    return this.optionRepository.find();
  }

  async findOne(id: number) {
    return await this.optionRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.optionRepository.findOne({ where: { name } });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    const option = await this.optionRepository.findOne({ where: { id } });
    Object.assign(option, updateOptionDto);
    return this.optionRepository.save(option);
  }

  remove(id: number) {
    return this.optionRepository.delete(id);
  }
}
