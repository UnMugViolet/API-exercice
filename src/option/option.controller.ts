import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
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
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: 'The option has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async create(@Body() createOptionDto: CreateOptionDto) {
    await this.optionService.create(createOptionDto);
    return 'Option has been successfully created !';
  }

  @Get('findAllOptions')
  @ApiOperation({ summary: 'Find all options' })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: 'List of all options.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async findAll() {
    const options = await this.optionService.findAll();
    if (!options || options.length === 0) {
      return 'No option found';
    }
    return options;
  }

  @Get(':id/findOneOption')
  @ApiOperation({ summary: 'Find an option by ID' })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: 'Option found.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
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
  @ApiResponse({ status: 201, description: 'Option updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    const option = await this.optionService.update(+id, updateOptionDto);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }

  @Delete(':id/removeOption')
  @ApiOperation({ summary: 'Remove an option' })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: 'Option removed.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  async remove(@Param('id') id: string) {
    const option = await this.optionService.remove(+id);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }
}
