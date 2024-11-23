import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('producto')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productosService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(term, updateProductoDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.productosService.remove(_id);
  }
}
