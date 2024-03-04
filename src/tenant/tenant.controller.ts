import { Controller, Get, Post, Body,  Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('createTenant')
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({ status: 201, description: 'The tenant has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get('findAllTenants')
  @ApiOperation({ summary: 'Find all tenants' })
  @ApiResponse({ status: 200, description: 'List of all tenants.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'No tenant found.'})
  async findAll() {
    const tenants = await this.tenantService.findAll();
    if (!tenants || tenants.length === 0) {
      return 'No tenant found';
    }
    return tenants;
  }

  @Get(':id/findOneTenant')
  @ApiOperation({ summary: 'Find a tenant by ID' })
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({ status: 200, description: 'Tenant found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Tenant not found.'})
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantService.findOne(+id);
    if (!tenant) {
      return `Tenant with ID ${id} not found`;
    }
    return tenant;
  }

  @Put(':id/updateTenant')
  @ApiOperation({ summary: 'Update a tenant' })
  @ApiBody({ type: UpdateTenantDto })
  @ApiResponse({ status: 200, description: 'Tenant updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Tenant not found.'})
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantService.findOne(+id);
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return this.tenantService.update(+id, updateTenantDto);
  }

  @Delete(':id/removeTenant')
  @ApiOperation({ summary: 'Remove a tenant' })
  @ApiResponse({ status: 200, description: 'Tenant removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Tenant not found.'})
  async remove(@Param('id') id: string) {
    const tenant = await this.tenantService.remove(+id);
    if (tenant.affected === 0) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return `Tenant with ID ${id} has been successfully removed !`;
  }
}
