import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigGeneralService } from './config-general.service';
import { CreateConfigGeneralDto } from './dto/create-config-general.dto';
import { UpdateConfigGeneralDto } from './dto/update-config-general.dto';

@Controller('config-general')
export class ConfigGeneralController {
  constructor(private readonly configGeneralService: ConfigGeneralService) {}

  @Post()
  create(@Body() createConfigGeneralDto: CreateConfigGeneralDto) {
    return this.configGeneralService.create(createConfigGeneralDto);
  }

  @Get()
  findAll() {
    return this.configGeneralService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.configGeneralService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateConfigGeneralDto: UpdateConfigGeneralDto) {
    return this.configGeneralService.update(term, updateConfigGeneralDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.configGeneralService.remove(term);
  }
}
