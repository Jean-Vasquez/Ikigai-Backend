import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('comprobante')
export class ComprobanteController {
  constructor(private readonly comprobanteService: ComprobanteService) {}

  @Post(':idventa')
  create(@Param('idventa') idventa: string){
    return this.comprobanteService.create(idventa);
  }

  @Get('usuario/:idusuario')
  findAllUsuario(
    @Param('idusuario') idusuario: string ,
    @Query() paginationDto : PaginationDto
  ){
    return this.comprobanteService.findAllUsuario(idusuario, paginationDto);
  }

  @Get('administrador')
  findAllAdministrador(@Query() paginationDto: PaginationDto) {
    return this.comprobanteService.findAllAdministrador(paginationDto);
  }

}
