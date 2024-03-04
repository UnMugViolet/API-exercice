import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignApartmentToBuildingDto } from './dto/assign-apartment-to-building.dto';
import { AssignAddressToBuildingDto } from './dto/assign-address-to-building.dto';
import { AssignFacilityToBuildingDto } from './dto/assign-facility-to-building.dto';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post('createBuilding')
  @ApiOperation({ summary: 'Create a new building' })
  @ApiBody({ type: CreateBuildingDto })
  @ApiResponse({ status: 201, description: 'The building has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    await this.buildingService.create(createBuildingDto);
    return 'Building has been successfully created !';
  }

  @Post(':buildingId/assignApartment')
  @ApiOperation({ summary: 'Assign apartment to building' })
  @ApiBody({ type: AssignApartmentToBuildingDto })
  @ApiResponse({ status: 201, description: 'The apartment has been successfully assigned to building.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignApartment(@Body() assignApartmentDto: AssignApartmentToBuildingDto, @Param('buildingId') buildingId: number) {
    await this.buildingService.assignApartment(buildingId, assignApartmentDto);
    return 'Apartment has been successfully assigned to building !';
  }

  @Post(':buildingId/assignAdress')
  @ApiOperation({ summary: 'Assign address to building' })
  @ApiBody({ type: AssignAddressToBuildingDto })
  @ApiResponse({ status: 201, description: 'The address has been successfully assigned to building.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignAddress(@Body() assignAdressDto: AssignAddressToBuildingDto, @Param('buildingId') buildingId: number) {
    await this.buildingService.assignAddress(buildingId, assignAdressDto);
    return 'Address has been successfully assigned to building !';
  }

  @Post(':buildingId/assignFacilities')
  @ApiOperation({ summary: 'Assign facilities to building' })
  @ApiBody({ type: AssignFacilityToBuildingDto })
  @ApiResponse({ status: 201, description: 'The facilities has been successfully assigned to building.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async assignFacilities(@Body() assignFacilitiesDto: AssignFacilityToBuildingDto, @Param('buildingId') buildingId: number) {
    await this.buildingService.assignFacilities(buildingId, assignFacilitiesDto);
    return 'Facilities has been successfully assigned to building !';
  }

  @Get('findAllBuildings')
  @ApiOperation({ summary: 'Find all buildings' })
  @ApiBody({ type: CreateBuildingDto })
  @ApiResponse({ status: 201, description: 'List of all buildings.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findAll() {
    const buildings = await this.buildingService.findAll();
    if (!buildings || buildings.length === 0) {
      return 'No building found';
    }
    return buildings;
  }

  @Get(':id/findOneBuilding')
  @ApiOperation({ summary: 'Find a building by ID' })
  @ApiBody({ type: CreateBuildingDto })
  @ApiResponse({ status: 201, description: 'Building found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findOne(@Param('id') id: string) {
    const building = await this.buildingService.findOne(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Get(':buildingId/getBuildingStats')
  @ApiOperation({ summary: 'Get building stats by ID' })
  @ApiBody({ type: CreateBuildingDto })
  @ApiResponse({ status: 201, description: 'Building stats found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async getBuildingById(@Param('buildingId') buildingId: number): Promise<any> {
    return this.buildingService.getBuildingStats(buildingId);
  }

  @Put(':id/updateBuilding')
  @ApiOperation({ summary: 'Update a building' })
  @ApiBody({ type: UpdateBuildingDto })
  @ApiResponse({ status: 201, description: 'Building updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    const building = await this.buildingService.update(+id, updateBuildingDto);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }

  @Delete(':id/removeBuilding')
  @ApiOperation({ summary: 'Remove a building' })
  @ApiBody({ type: CreateBuildingDto })
  @ApiResponse({ status: 201, description: 'Building removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async remove(@Param('id') id: string) {
    const building = await this.buildingService.remove(+id);
    if (!building) {
      return `Building with ID ${id} not found`;
    }
    return building;
  }
}
