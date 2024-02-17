import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
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
  findAll() {
    return this.commonFacilityToBuildingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonFacilityToBuildingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommonFacilityToBuildingDto: UpdateCommonFacilityToBuildingDto) {
    return this.commonFacilityToBuildingService.update(+id, updateCommonFacilityToBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonFacilityToBuildingService.remove(+id);
  }
}
