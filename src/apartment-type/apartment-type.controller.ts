import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
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
    await this.apartmentTypeService.create(createApartmentTypeDto);
    return 'Apartment type has been successfully created !';
  }

  @Get('findAllApartmentTypes')
  @ApiOperation({ summary: 'Find all apartment types' })
  @ApiBody({ type: CreateApartmentTypeDto })
  @ApiResponse({ status: 201, description: 'List of all apartment types.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findAll() {
    const apartmentTypes = await this.apartmentTypeService.findAll();
    if (!apartmentTypes || apartmentTypes.length === 0) {
      return 'No apartment types found';
    }
    return apartmentTypes;
  }

  @Get(':id/findOneApartmentType')
  @ApiOperation({ summary: 'Find an apartment type by ID' })
  @ApiBody({ type: CreateApartmentTypeDto })
  @ApiResponse({ status: 201, description: 'Apartment type found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findOne(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.findOne(+id);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }

  @Put(':id/updateApartmentType')
  @ApiOperation({ summary: 'Update an apartment type' })
  @ApiBody({ type: UpdateApartmentTypeDto })
  @ApiResponse({ status: 201, description: 'Apartment type updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    const apartmentType = await this.apartmentTypeService.update(+id, updateApartmentTypeDto);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }

  @Delete(':id/removeApartmentType')
  @ApiBody({ type: CreateApartmentTypeDto })
  @ApiOperation({ summary: 'Remove an apartment type' })
  @ApiResponse({ status: 201, description: 'Apartment type removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async remove(@Param('id') id: string) {
    const apartmentType = await this.apartmentTypeService.remove(+id);
    if (!apartmentType) {
      return `Apartment type with ID ${id} not found`;
    }
    return apartmentType;
  }
}
