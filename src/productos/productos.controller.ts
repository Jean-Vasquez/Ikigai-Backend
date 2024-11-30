import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RolAdministradorGuard } from 'src/usuario/guard/rol-administrador.guard';
import { RolTodosGuard } from 'src/usuario/guard/rol-todos.guard';
import { RolClienteGuard } from 'src/usuario/guard/rol-cliente.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('producto')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @UseGuards(RolAdministradorGuard)//esta petición solo puede usarla el administrador
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @UseGuards(RolAdministradorGuard)//esta petición solo puede usarla el administrador
  findAll(@Query() paginationDto : PaginationDto) {
    return this.productosService.findAll(paginationDto);
  }

  @Get('cliente')
  @UseGuards(RolTodosGuard)//esta petición es para el cliente y administrador
  findProductsClient(@Query() paginationDto : PaginationDto) {
    return this.productosService.findProductsClient(paginationDto);
  }

  @Get('nuevo')
  @UseGuards(RolTodosGuard)//esta petición es para el cliente y administrador
  findNewProducts(@Query() paginationDto : PaginationDto) {
    return this.productosService.findNewProducts(paginationDto);
  }

  @Get(':term')
  @UseGuards(RolTodosGuard)//esta petición es para el cliente y administrador
  findOne(@Param('term') term: string) {
    return this.productosService.findOne(term);
  }

  @Patch(':term')
  @UseGuards(RolAdministradorGuard)//esta petición solo puede usarla el administrador
  update(@Param('term') term: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(term, updateProductoDto);
  }

  @Delete(':_id')
  @UseGuards(RolAdministradorGuard)//esta petición solo puede usarla el administrador
  remove(@Param('_id') _id: string) {
    return this.productosService.remove(_id);
  }
}
