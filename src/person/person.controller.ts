import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  async findAll() {
    const persons = await this.personService.findAll();
    if (!persons || persons.length === 0) {
      return 'No persons found';
    }
    return persons;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const person = await this.personService.findOne(+id);
    if (!person) {
      return `Person with ID ${id} not found`;
    }
    return person;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    const person = await this.personService.update(+id, updatePersonDto);
    if (!person) {
      return `Person with ID ${id} not found`;
    }
    return person;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const person = await  this.personService.remove(+id);
    if (!person) {
      return `Person with ID ${id} not found`;
    }
    return person;
  }
}
