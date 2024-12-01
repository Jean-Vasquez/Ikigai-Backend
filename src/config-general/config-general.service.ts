import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigGeneral } from './entities/config-general.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
@Injectable()
export class ConfigGeneralService {
  
  constructor(
    @InjectModel(ConfigGeneral.name)
    private readonly configModel: Model<ConfigGeneral>,
    private commonService : CommonService,
  ){}

  async create(){
    try {
      // Verifica si ya existe una configuración
      const existingConfig = await this.configModel.findOne();
      if (existingConfig) {
        throw new Error('La configuración general ya existe');
      }
      // Crea la configuración con los valores por defecto o personalizados
      const newConfig = new this.configModel();
      return await newConfig.save();
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

async obtenerConfig(){
  try{
   const config = await this.configModel.findOne()
    if (!config) {
    throw new NotFoundException('Configuración general no encontrada');
    }
   return config
  }catch(error){
    this.commonService.handleExceptions(error)
  }
}
  
async incrementarNo(){
  try{
    const config = await this.obtenerConfig()
    config.noActual += config.incremento
    return config.save()
  }catch(error){
    this.commonService.handleExceptions(error)
  }
}

}
