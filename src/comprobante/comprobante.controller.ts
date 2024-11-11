import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { Comprobante } from './entities/comprobante.entity';

@Controller('comprobante')
export class ComprobanteController {
  constructor(private readonly comprobanteService: ComprobanteService) {}

  @Post()
  create(@Body() createComprobanteDto: CreateComprobanteDto): Promise<Comprobante> {
    return this.comprobanteService.create(createComprobanteDto);
  }

  @Get()
  findAll(): Promise<Comprobante[]> {
    return this.comprobanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',) id: string): Promise<Comprobante> {
    return this.comprobanteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ) id: string, @Body() updateComprobanteDto: UpdateComprobanteDto): Promise<Comprobante> {
    return this.comprobanteService.update(id, updateComprobanteDto);
  }

  @Delete(':id')
  remove(@Param('id', ) id: string): Promise<string> {
    return this.comprobanteService.remove(id);
  }
}
