import { Injectable } from '@nestjs/common';
import { Comprobante } from './entities/comprobante.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigGeneralService } from 'src/config-general/config-general.service';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ComprobanteService {

  constructor(
    @InjectModel(Comprobante.name)
    private readonly comprobanteModel: Model<Comprobante>,
    private readonly configGeneralService : ConfigGeneralService,
    private commonService : CommonService,
  ){}

  async create(idventa: string){
   try{
    const config = await this.configGeneralService.obtenerConfig()
    const numActual = config.noActual
    const seriecomprobante = config.serie

    await this.configGeneralService.incrementarNo()

    const comprobante = new this.comprobanteModel({
      idventa,
      numerocomprobante : numActual,
      seriecomprobante : seriecomprobante
    })

    return comprobante.save()
   }catch(error){
    this.commonService.handleExceptions(error)
   }
  }


  async findAllUsuario(idUsuario: string, paginationDto: PaginationDto) {
    try {
      const { offset = 0, sortField = 'createdAt', sortOrder = 'asc' } = paginationDto;
      const comprobantes = await this.comprobanteModel
        .find({ idventa: idUsuario })
        .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(9);
      return comprobantes;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findAllAdministrador(paginationDto: PaginationDto) {
    try {
      const { offset = 0, sortField = 'createdAt', sortOrder = 'asc' } = paginationDto;
      const comprobantes = await this.comprobanteModel
        .find()
        .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(9);
      return comprobantes;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

}
