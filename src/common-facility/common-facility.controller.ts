import { Controller, Get, Post, Body,  Param, Delete, NotFoundException, Put} from '@nestjs/common';
import { CommonFacilityService } from './common-facility.service';
import { CreateCommonFacilityDto } from './dto/create-common-facility.dto';
import { UpdateCommonFacilityDto } from './dto/update-common-facility.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common Facility')
@Controller('common-facility')
export class CommonFacilityController {
  constructor(private readonly commonFacilityService: CommonFacilityService) {}

  @Post()
  create(@Body() createCommonFacilityDto: CreateCommonFacilityDto) {
    return this.commonFacilityService.create(createCommonFacilityDto);
  }

  @Get()
  async findAll() {
    const commonFacility = await this.commonFacilityService.findAll();
    if (!commonFacility || commonFacility.length === 0) {
      throw new NotFoundException('No common facility found');
    }
    return commonFacility;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const commonFacilities = await this.commonFacilityService.findOne(+id);
    if (!commonFacilities) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return commonFacilities;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommonFacilityDto: UpdateCommonFacilityDto) {
    const commonFacility = this.commonFacilityService.update(+id, updateCommonFacilityDto);
    if (!commonFacility) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return commonFacility;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const commonFacility = await this.commonFacilityService.remove(+id);
    if (!commonFacility) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return commonFacility;
  }
}
