import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { ApartmentTypeService } from './apartment-type.service';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Apartment Type')
@Controller('apartment-type')
export class ApartmentTypeController {
  constructor(private readonly apartmentTypeService: ApartmentTypeService) {}

  @Post()
  create(@Body() createApartmentTypeDto: CreateApartmentTypeDto) {
    return this.apartmentTypeService.create(createApartmentTypeDto);
  }

  @Get()
  async findAll() {
    const apartmentTypes = await this.apartmentTypeService.findAll();
    if (!apartmentTypes || apartmentTypes.length === 0) {
      return 'No apartment types found';
    }
    return apartmentTypes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.findOne(+id);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    const apartmentType = await this.apartmentTypeService.update(+id, updateApartmentTypeDto);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.remove(+id);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }
}
