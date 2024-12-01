import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { ConfigGeneralService } from './config-general.service';
@Controller('config-general')
export class ConfigGeneralController {
  constructor(private readonly configGeneralService: ConfigGeneralService) {}

  @Post()
  create() {
    return this.configGeneralService.create();
  }

  @Get()
  obtenerConfig() {
    return this.configGeneralService.obtenerConfig();
  }

  @Patch()
  incrementarNo() {
    return this.configGeneralService.incrementarNo();
  }
  
  //Si es completamente estático, podrías omitir el controlador o
  // mantenerlo solo para acceso administrativo.
}
