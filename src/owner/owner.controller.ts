import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveApartmentFromOwnerDto } from './dto/remove-apartment-to-owner.dto';
import { AssignApartmentToOwnerDto } from './dto/assign-apartment-to-owner.dto';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('createOwner')
  createOwner(@Body() createOwnerDto: CreateOwnerDto) {
    if (!createOwnerDto) {
      return 'Owner data is required';
    }
    return this.ownerService.create(createOwnerDto);
  }

  @Post('assignApatmentToOwner')
  async assignApatmentToOwner(@Body() assignApatmentToOwnerDto: AssignApartmentToOwnerDto) {
    const { ownerId, apartmentId } = assignApatmentToOwnerDto;
    if (!ownerId || !apartmentId) {
      return 'Owner ID and Apartment ID are required';
    }
    return this.ownerService.assignApatmentToOwner(ownerId, apartmentId);
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
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerService.update(+id, updateOwnerDto);
    if (!owner) {
      return `Owner with ID ${id} not found`;
    }
    return owner;
  }
  
  @Delete(':ownerId/removeApartmentFromOwner')
  async removeApartmentFromOwner(@Body() removeApartmentFromOwnerDto: RemoveApartmentFromOwnerDto, @Param('ownerId') ownerId: number) {
    const { apartmentId } = removeApartmentFromOwnerDto;
    if (!ownerId || !apartmentId) {
      return 'Owner ID and Apartment ID are required';
    }
    return this.ownerService.removeApartmentFromOwner(ownerId, apartmentId);
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
