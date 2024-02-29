import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  async findAll() {
    const tenants = await this.tenantService.findAll();
    if (!tenants || tenants.length === 0) {
      return 'No tenant found';
    }
    return tenants;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantService.findOne(+id);
    if (!tenant) {
      return `Tenant with ID ${id} not found`;
    }
    return tenant;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantService.update(+id, updateTenantDto);
    if (!tenant) {
      return `Tenant with ID ${id} not found`;
    }
    return tenant;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tenant = await this.tenantService.remove(+id);
    if (!tenant) {
      return `Tenant with ID ${id} not found`;
    }
    return tenant;
  }
}
