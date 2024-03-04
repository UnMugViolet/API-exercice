import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveApartmentFromOwnerDto } from './dto/remove-apartment-to-owner.dto';
import { AssignApartmentToOwnerDto } from './dto/assign-apartment-to-owner.dto';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('createOwner')
  @ApiOperation({ summary: 'Create owner' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'The owner has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async createOwner(@Body() createOwnerDto: CreateOwnerDto) {
    if (!createOwnerDto) {
      return 'Owner data is required';
    }
    await this.ownerService.create(createOwnerDto);
    return 'Owner has been successfully created !';

  }

  @Post('assignApatmentToOwner')
  @ApiOperation({ summary: 'Assign apartment to owner' })
  @ApiBody({ type: AssignApartmentToOwnerDto })
  @ApiResponse({ status: 201, description: 'The apartment has been successfully assigned to owner.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignApatmentToOwner(@Body() assignApatmentToOwnerDto: AssignApartmentToOwnerDto) {
    const { ownerId, apartmentId } = assignApatmentToOwnerDto;
    if (!ownerId || !apartmentId) {
      return 'Owner ID and Apartment ID are required';
    }
    await this.ownerService.assignApatmentToOwner(ownerId, apartmentId);
    return 'Apartment has been successfully assigned to owner !';
  }

  @Get('findAllOwners')
  @ApiOperation({ summary: 'Find all owners' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'List of all owners.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findAll() {
    const owners = await this.ownerService.findAll();
    if (!owners || owners.length === 0) {
      return 'No owner found';
    }
    return owners;
  }

  @Get(':id/findOneOwner')
  @ApiOperation({ summary: 'Find an owner by ID' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'Owner found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findOne(@Param('id') id: string) {
    const owner = await this.ownerService.findOne(+id);
    if (!owner) {
      return `Owner with ID ${id} not found`;
    }
  }

  @Put(':id/updateOwner')
  @ApiOperation({ summary: 'Update an owner' })
  @ApiBody({ type: UpdateOwnerDto })
  @ApiResponse({ status: 201, description: 'Owner updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerService.update(+id, updateOwnerDto);
    if (!owner) {
      return `Owner with ID ${id} not found`;
    }
    return owner;
  }
  
  @Delete(':ownerId/removeApartmentFromOwner')
  @ApiOperation({ summary: 'Remove apartment from owner' })
  @ApiBody({ type: RemoveApartmentFromOwnerDto })
  @ApiResponse({ status: 201, description: 'Apartment removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async removeApartmentFromOwner(@Body() removeApartmentFromOwnerDto: RemoveApartmentFromOwnerDto, @Param('ownerId') ownerId: number) {
    const { apartmentId } = removeApartmentFromOwnerDto;
    if (!ownerId || !apartmentId) {
      return 'Owner ID and Apartment ID are required';
    }
    await this.ownerService.removeApartmentFromOwner(ownerId, apartmentId);
    return 'Apartment has been successfully removed from owner !';
  }

  @Delete(':id/removeOwner')
  @ApiOperation({ summary: 'Remove an owner' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'Owner removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async remove(@Param('id') id: string) {
    const owner = await this.ownerService.remove(+id);
    if (!owner) {
      return 'Owner with ID ${id} not found'; 
    }
    return owner;
  }
}
