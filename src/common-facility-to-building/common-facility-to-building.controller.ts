import { Controller, Get, Post, Body,  Param, Delete, Put} from '@nestjs/common';
import { CommonFacilityToBuildingService } from './common-facility-to-building.service';
import { CreateCommonFacilityToBuildingDto } from './dto/create-common-facility-to-building.dto';
import { UpdateCommonFacilityToBuildingDto } from './dto/update-common-facility-to-building.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common Facility To Buildings')
@Controller('common-facility-to-building')
export class CommonFacilityToBuildingController {
  constructor(private readonly commonFacilityToBuildingService: CommonFacilityToBuildingService) {}

  @Post()
  create(@Body() createCommonFacilityToBuildingDto: CreateCommonFacilityToBuildingDto) {
    return this.commonFacilityToBuildingService.create(createCommonFacilityToBuildingDto);
  }

  @Get()
  async findAll() {
    const commonFaciliesToBuilding = await this.commonFacilityToBuildingService.findAll();
    if (!commonFaciliesToBuilding || commonFaciliesToBuilding.length === 0) {
      return 'There isn\'t any common facility to building';
    }
    return commonFaciliesToBuilding;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const commonFacilityToBuilding = await this.commonFacilityToBuildingService.findOne(+id);
    if (!commonFacilityToBuilding) {
      return `Common facility to building with ID ${id} not found`;
    }
    return commonFacilityToBuilding;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommonFacilityToBuildingDto: UpdateCommonFacilityToBuildingDto) {
    const commonFacilityToBuilding = await this.commonFacilityToBuildingService.update(+id, updateCommonFacilityToBuildingDto);
    if (!commonFacilityToBuilding) {
      return `Common facility to building with ID ${id} not found`;
    }
    return commonFacilityToBuilding;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const commonFacilityToBuilding = await this.commonFacilityToBuildingService.remove(+id);
    if (!commonFacilityToBuilding) {
      return `Common facility to building with ID ${id} not found`;
    }
    return commonFacilityToBuilding;
  }
}
