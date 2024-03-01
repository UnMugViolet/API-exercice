import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('createOption')
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get('findAllOptions')
  async findAll() {
    const options = await this.optionService.findAll();
    if (!options || options.length === 0) {
      return 'No option found';
    }
    return options;
  }

  @Get(':id/findOneOption')
  async findOne(@Param('id') id: string) {
    const option = await this.optionService.findOne(+id);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }

  @Patch(':id/updateOption')
  async update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    const option = await this.optionService.update(+id, updateOptionDto);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }

  @Delete(':id/removeOption')
  async remove(@Param('id') id: string) {
    const option = await this.optionService.remove(+id);
    if (!option) {
      return `Option with ID ${id} not found`;
    }
    return option;
  }
}
