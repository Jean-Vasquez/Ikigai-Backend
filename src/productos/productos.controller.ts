import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RolAdministradorGuard } from 'src/usuario/guard/rol-administrador.guard';
import { RolTodosGuard } from 'src/usuario/guard/rol-todos.guard';
import { RolClienteGuard } from 'src/usuario/guard/rol-cliente.guard';

@Controller('producto')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @UseGuards(RolAdministradorGuard)//ejemplo para el administrador
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @UseGuards(RolTodosGuard)//ejemplo para todos los usurios cliente y administrador
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':term')
  @UseGuards(RolClienteGuard)//ejemplo para el cliente
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
