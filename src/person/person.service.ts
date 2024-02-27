import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create(createPersonDto as DeepPartial<PersonEntity>);
    return this.personRepository.save(newPerson);
  }

  findAll() {
    return this.personRepository.find();
  }

  async findOne(id: number) {
    return await this.personRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.findOne({ where: { id } });
    Object.assign(person, updatePersonDto);
    return this.personRepository.save(person);
  }

  remove(id: number) {
    return this.personRepository.delete(id);
  }
}
