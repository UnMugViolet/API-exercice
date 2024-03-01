import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('createAddress')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get('findAllAddresses')
  async findAll() {
    const addresses = await this.addressService.findAll();
    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('No addresses found');
    }
    return addresses;
  }

  @Get(':id/findOneAddress')
  async findOne(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  @Patch(':id/updateAddress')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const address = this.addressService.findOne(+id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id/removeAddress')
  async remove(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return this.addressService.remove(+id);
  }
}
