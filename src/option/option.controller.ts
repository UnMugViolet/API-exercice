import { Controller, Get, Post, Body,  Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('createOption')
  @ApiOperation({ summary: 'Create a new option' })
  @ApiResponse({ status: 200, description: 'The option has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createOptionDto: CreateOptionDto) {
    await this.optionService.create(createOptionDto);
    return 'Option has been successfully created !';
  }

  @Get('findAllOptions')
  @ApiOperation({ summary: 'Find all options' })
  @ApiResponse({ status: 200, description: 'List of all options.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'No option found.'})
  async findAll() {
    const options = await this.optionService.findAll();
    if (!options || options.length === 0) {
      return 'No option found';
    }
    return options;
  }

  @Get(':id/findOneOption')
  @ApiOperation({ summary: 'Find an option by ID' })
  @ApiResponse({ status: 200, description: 'Option found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Option not found.'})
  async findOne(@Param('id') id: string) {
    const option = await this.optionService.findOne(+id);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }

  @Put(':id/updateOption')
  @ApiOperation({ summary: 'Update an option' })
  @ApiBody({ type: UpdateOptionDto })
  @ApiResponse({ status: 200, description: 'Option updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Option not found.'})
  async update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    const option = await this.optionService.findOne(+id);
    if (!option) {
      throw new NotFoundException(`Option with ID ${id} not found`);
    }
    const updatedOption = await this.optionService.update(+id, updateOptionDto);
    return updatedOption;
  }

  @Delete(':id/removeOption')
  @ApiOperation({ summary: 'Remove an option' })
  @ApiResponse({ status: 200, description: 'Option removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Option not found.'})
  async remove(@Param('id') id: string) {
    const option = await this.optionService.remove(+id);
    if (option.affected === 0) {
      throw new NotFoundException(`Option with ID ${id} not found`);
    }
    return `Option with ID ${id} has been successfully removed !`;
  }
}
