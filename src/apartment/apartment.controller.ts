import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateApartmentWithTenantDto } from './dto/create-apartment-with-tenant.dto';
import { CreateApartmentWitOptionDto } from './dto/create-apartment-with-option.dto';
import { DeleteTenantFromApartmentDto } from './dto/delete-tenant-from-apartment.dto';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(
    private readonly apartmentService: ApartmentService
  ) {}

  @Post('assignOptionToApartment')
  @ApiOperation({ summary: 'Assign option to apartment' })
  @ApiBody({ type: CreateApartmentWitOptionDto })
  @ApiResponse({ status: 201, description: 'The option has been successfully assigned to apartment.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignOptionToApartment(@Body() createApartmentWitOptionDto: CreateApartmentWitOptionDto) {
    await this.apartmentService.assignOption(createApartmentWitOptionDto);
    return 'Option has been successfully assigned to apartment !';
  }

  @Post('createApartmentWithType')
  @ApiOperation({ summary: 'Create apartment with type' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({ status: 201, description: 'The apartment has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async createApartmentWithType(@Body() createApartmentDto: CreateApartmentDto) {
    await this.apartmentService.createApartmentWithType(createApartmentDto);
    return 'Apartment has been successfully created !';
  }

  @Post(':apartmentId/assignTenantToApartment')
  @ApiOperation({ summary: 'Assign tenant to apartment' })
  @ApiBody({ type: CreateApartmentWithTenantDto })
  @ApiResponse({ status: 201, description: 'The tenant has been successfully assigned to apartment.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignTenant(@Body() createApartmentWithTenantDto: CreateApartmentWithTenantDto, @Param('apartmentId') apartmentId: number) {
    await this.apartmentService.assignTenant(apartmentId, createApartmentWithTenantDto);
    return 'Tenant has been successfully assigned to apartment !';
  }

  @Get('findAllApartments')
  @ApiOperation({ summary: 'Find all apartments' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({ status: 201, description: 'List of all apartments.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findAll() {
    const apartments = await this.apartmentService.findAll();
    if (!apartments || apartments.length === 0) {
      throw new NotFoundException('No apartments found');
    }
    return apartments;
  }

  @Get(':id/findOneApartment')
  @ApiOperation({ summary: 'Find an apartment by ID' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({ status: 201, description: 'Apartment found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findOne(@Param('id') id: string) {
    const apartment = await this.apartmentService.findOne(+id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  @Put(':id/updateApartment')
  @ApiOperation({ summary: 'Update an apartment' })
  @ApiBody({ type: UpdateApartmentDto })
  @ApiResponse({ status: 201, description: 'Apartment updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    const apartment = this.apartmentService.update(+id, updateApartmentDto);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  @Delete(':id/deleteApartment')
  @ApiOperation({ summary: 'Remove an apartment' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({ status: 201, description: 'Apartment removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async remove(@Param('id') id: string) {
    const apartment = await this.apartmentService.remove(+id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  @Delete(':apartmentId/removeTenantFromApartment')
  @ApiOperation({ summary: 'Remove tenant from apartment' })
  @ApiBody({ type: DeleteTenantFromApartmentDto })
  @ApiResponse({ status: 201, description: 'Tenant removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async removeTenantFromApartment(@Body() deleteTenantDto: DeleteTenantFromApartmentDto, @Param('apartmentId') apartmentId: number) {
    const { tenantIds } = deleteTenantDto;
    await this.apartmentService.removeTenantFromApartment(apartmentId, tenantIds);
    return 'Tenant has been successfully removed from apartment !';
  }
}