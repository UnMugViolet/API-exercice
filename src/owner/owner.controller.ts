import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  async findAll() {
    const owners = await this.ownerService.findAll();
    if (!owners || owners.length === 0) {
      return 'No owner found';
    }
    return owners;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const owner = await this.ownerService.findOne(+id);
    if (!owner) {
      return `Owner with ID ${id} not found`;
    }
    return owner;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerService.update(+id, updateOwnerDto);
    if (!owner) {
      return `Owner with ID ${id} not found`;
    }
    return owner;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const owner = await this.ownerService.remove(+id);
    if (!owner) {
      return 'Owner with ID ${id} not found'; 
    }
    return owner;
  }
}
