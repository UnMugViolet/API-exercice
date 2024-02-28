import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateApartmentWithTenantDto } from './dto/create-apartment-with-tenant.dto';
import { CreateApartmentWitOptionDto } from './dto/create-apartment-with-option.dto';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(
    private readonly apartmentService: ApartmentService
  ) {}

  @Post('assignOptionToApartment')
  assignOptionToApartment(@Body() createApartmentWitOptionDto: CreateApartmentWitOptionDto) {
    return this.apartmentService.assignOption(createApartmentWitOptionDto);
  }

  @Post('createApartmentWithType')
  createApartmentWithType(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.createApartmentWithType(createApartmentDto);
  }

  @Post(':apartmentId/createTenantForApartment')
  assignTenant(@Body() createApartmentWithTenantDto: CreateApartmentWithTenantDto, @Param('apartmentId') apartmentId: number) {
    return this.apartmentService.assignTenant(apartmentId, createApartmentWithTenantDto);
  }

  @Get()
  async findAll() {
    const apartments = await this.apartmentService.findAll();
    if (!apartments || apartments.length === 0) {
      throw new NotFoundException('No apartments found');
    }
    return apartments;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const apartment = await this.apartmentService.findOne(+id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    const apartment = this.apartmentService.update(+id, updateApartmentDto);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const apartment = await this.apartmentService.remove(+id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }
}
