import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiTags } from '@nestjs/swagger';
import { AssignApartmentToBuildingDto } from './dto/assign-apartment-to-building.dto';
import { AssignAddressToBuildingDto } from './dto/assign-adress-to-building.dto';
import { AssignFacilityToBuildingDto } from './dto/assign-facility-to-building.dto';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post('createBuilding')
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Post(':buildingId/assignApartment')
  async assignApartment(@Body() assignApartmentDto: AssignApartmentToBuildingDto, @Param('buildingId') buildingId: number) {
    return this.buildingService.assignApartment(buildingId, assignApartmentDto);
  }

  @Post(':buildingId/assignAdress')
  async assignAddress(@Body() assignAdressDto: AssignAddressToBuildingDto, @Param('buildingId') buildingId: number) {
    return this.buildingService.assignAddress(buildingId, assignAdressDto);
  }

  @Post(':buildingId/assignFacilities')
  async assignFacilities(@Body() assignFacilitiesDto: AssignFacilityToBuildingDto, @Param('buildingId') buildingId: number) {
    return this.buildingService.assignFacilities(buildingId, assignFacilitiesDto);
  }

  @Get('findAllBuildings')
  async findAll() {
    const buildings = await this.buildingService.findAll();
    if (!buildings || buildings.length === 0) {
      return 'No building found';
    }
    return buildings;
  }

  @Get(':id/findOneBuilding')
  async findOne(@Param('id') id: string) {
    const building = await this.buildingService.findOne(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Get(':buildingId/getBuildingStats')
  async getBuildingById(@Param('buildingId') buildingId: number): Promise<any> {
    return this.buildingService.getBuildingStats(buildingId);
  }

  @Put(':id/updateBuilding')
  async update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    const building = await this.buildingService.update(+id, updateBuildingDto);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Delete(':id/deleteBuilding')
  async remove(@Param('id') id: string) {
    const building = await this.buildingService.remove(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }
}
