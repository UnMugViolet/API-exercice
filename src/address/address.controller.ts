import { Controller, Get, Post, Body,  Param, Delete, NotFoundException, Put} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('createAddress')
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: 'The address has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get('findAllAddresses')
  @ApiOperation({ summary: 'Find all addresses' })
  @ApiResponse({ status: 200, description: 'List of all addresses.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
    async findAll() {
    const addresses = await this.addressService.findAll();
    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('No addresses found');
    }
    return addresses;
  }

  @Get(':id/findOneAddress')
  @ApiOperation({ summary: 'Find an address by ID' })
  @ApiResponse({ status: 200, description: 'Address found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findOne(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  @Put(':id/updateAddress')
  @ApiOperation({ summary: 'Update an address' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: 'Address updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const address = this.addressService.findOne(+id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id/removeAddress')
  @ApiOperation({ summary: 'Remove an address' })
  @ApiResponse({ status: 200, description: 'Address removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Address not found.'})
  async remove(@Param('id') id: string) {
    const address = await this.addressService.remove(+id);
    if (address.affected === 0 ) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return `Address with ID ${id} has been successfully removed !`;
  }
}
