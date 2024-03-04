import { Controller, Get, Post, Body,  Param, Delete, NotFoundException, Put} from '@nestjs/common';
import { CommonFacilityService } from './common-facility.service';
import { CreateCommonFacilityDto } from './dto/create-common-facility.dto';
import { UpdateCommonFacilityDto } from './dto/update-common-facility.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Common Facility')
@Controller('common-facility')
export class CommonFacilityController {
  constructor(private readonly commonFacilityService: CommonFacilityService) {}

  @Post('createCommonFacility')
  @ApiOperation({ summary: 'Create a new common facility' })
  @ApiBody ({ type: CreateCommonFacilityDto })
  @ApiResponse({ status: 201, description: 'The common facility has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Common facility not found.'})
  async create(@Body() createCommonFacilityDto: CreateCommonFacilityDto) {
    await this.commonFacilityService.create(createCommonFacilityDto);
    return 'Common facility has been successfully created !';
  }

  @Get('findAllCommonFacilities')
  @ApiOperation({ summary: 'Find all common facilities' })
  @ApiResponse({ status: 200, description: 'List of all common facilities.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'No common facility found.'})
  async findAll() {
    const commonFacility = await this.commonFacilityService.findAll();
    if (!commonFacility || commonFacility.length === 0) {
      throw new NotFoundException('No common facility found');
    }
    return commonFacility;
  }

  @Get(':id/findOneCommonFacility')
  @ApiOperation({ summary: 'Find a common facility by ID' })
  @ApiResponse({ status: 200, description: 'Common facility found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Common facility not found.'})
  async findOne(@Param('id') id: string) {
    const commonFacilities = await this.commonFacilityService.findOne(+id);
    if (!commonFacilities) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return commonFacilities;
  }

  @Put(':id/updateCommonFacility')
  @ApiOperation({ summary: 'Update a common facility' })
  @ApiBody({ type: UpdateCommonFacilityDto })
  @ApiResponse({ status: 200, description: 'Common facility updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Common facility not found.'})
  update(@Param('id') id: string, @Body() updateCommonFacilityDto: UpdateCommonFacilityDto) {
    const commonFacility = this.commonFacilityService.update(+id, updateCommonFacilityDto);
    if (!commonFacility) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return commonFacility;
  }

  @Delete(':id/removeCommonFacility')
  @ApiOperation({ summary: 'Remove a common facility' })
  @ApiResponse({ status: 200, description: 'Common facility removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Common facility not found.'})
  async remove(@Param('id') id: string) {
    const commonFacility = await this.commonFacilityService.remove(+id);
    if (commonFacility.affected === 0) {
      throw new NotFoundException(`Common facility with ID ${id} not found`);
    }
    return `Common facility with ID ${id} has been successfully removed !`;
  }
}
