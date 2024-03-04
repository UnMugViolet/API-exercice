import { Controller, Get, Post, Body,  Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ApartmentTypeService } from './apartment-type.service';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Apartment Type')
@Controller('apartment-type')
export class ApartmentTypeController {
  constructor(private readonly apartmentTypeService: ApartmentTypeService) {}

  @Post('createApartmentType')
  @ApiOperation({ summary: 'Create apartment type' })
  @ApiBody({ type: CreateApartmentTypeDto })
  @ApiResponse({ status: 201, description: 'The apartment type has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createApartmentTypeDto: CreateApartmentTypeDto) {
    return this.apartmentTypeService.create(createApartmentTypeDto);  
  }

  @Get('findAllApartmentTypes')
  @ApiOperation({ summary: 'Find all apartment types' })
  @ApiResponse({ status: 200, description: 'List of all apartment types.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'No apartment type found.'})
  async findAll() {
    const apartmentTypes = await this.apartmentTypeService.findAll();
    if (!apartmentTypes || apartmentTypes.length === 0) {
      throw new NotFoundException('No apartment types found');
    }
    return apartmentTypes;
  }

  @Get(':id/findOneApartmentType')
  @ApiOperation({ summary: 'Find an apartment type by ID' })
  @ApiResponse({ status: 200, description: 'Apartment type found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Apartment type not found.'})
  async findOne(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.findOne(+id);
    if (!apartmentType) {
      throw new NotFoundException(`Apartment type with ID ${id} not found`);
    }
    return apartmentType;
  }

  @Put(':id/updateApartmentType')
  @ApiOperation({ summary: 'Update an apartment type' })
  @ApiBody({ type: UpdateApartmentTypeDto })
  @ApiResponse({ status: 200, description: 'Apartment type updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Apartment type not found.'})
  async update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    const apartmentType = await this.apartmentTypeService.findOne(+id);
    if (!apartmentType) {
      throw new NotFoundException(`Apartment type with ID ${id} not found`);
    }
    const updatedApartmentType = await this.apartmentTypeService.update(+id, updateApartmentTypeDto);
    return updatedApartmentType;
  }

  @Delete(':id/removeApartmentType')
  @ApiOperation({ summary: 'Remove an apartment type' })
  @ApiResponse({ status: 200, description: 'Apartment type removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Apartment type not found.'})
  async remove(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.remove(+id);
    if (apartmentType.affected === 0) {
      throw new NotFoundException(`Apartment type with ID ${id} not found`);
    }
    return apartmentType;
  }
}
