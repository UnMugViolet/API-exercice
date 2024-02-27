import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  async findAll() {
    const buildings = await this.buildingService.findAll();
    if (!buildings || buildings.length === 0) {
      return 'No building found';
    }
    return buildings;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const building = await this.buildingService.findOne(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    const building = await this.buildingService.update(+id, updateBuildingDto);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const building = await this.buildingService.remove(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }
}
