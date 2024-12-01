import { Controller, Get, Post, Param } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';

@Controller('comprobante')
export class ComprobanteController {
  constructor(private readonly comprobanteService: ComprobanteService) {}

  @Post(':idventa')
  create(@Param('idventa') idventa: string){
    return this.comprobanteService.create(idventa);
  }

  @Get()
  findAll(){
    return this.comprobanteService.findAll();
  }

}
