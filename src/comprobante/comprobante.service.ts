import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { Comprobante } from './entities/comprobante.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ComprobanteService {

  constructor(
    @InjectModel(Comprobante.name)
    private readonly comprobanteModel: Model<Comprobante>
  ){}

  async create(createComprobanteDto: CreateComprobanteDto): Promise<Comprobante> {
    const newComprobante = {
      ...createComprobanteDto,
      createdAt: new Date().getTime(),
      estado: true,
    };
    try {
      return await this.comprobanteModel.create(newComprobante);
    } catch (error) {
      throw new NotFoundException('Error al crear el comprobante.')
    }
  }


  async findAll(): Promise<Comprobante[]> {
    try {
      return await this.comprobanteModel.find({ estado: true }).exec()
    } catch (error) {
      throw new NotFoundException('Error al obtener comprobantes.')
    }
  }


  async findOne(id: string): Promise<Comprobante> {
    if(isValidObjectId(id)){
      try {
        const comprobante = await this.comprobanteModel.findOne({ _id: id, estado: true });
        if(!comprobante)
          throw new NotFoundException('El comprobante no existe.');
        return comprobante;
      } catch (error) {
        throw new NotFoundException('Error al obtener el comprobante.')
      }
    }else{
      throw new NotFoundException('El id no es un objeto valido')
    }
  }

async update(id: string, updateComprobanteDto: UpdateComprobanteDto): Promise<Comprobante> {
  if(isValidObjectId(id)){
    try {
      const comprobanteBD = await this.findOne(id);
      const {numerocomprobante,seriecomprobante,tipocomprobante} = updateComprobanteDto;
 
      if(!numerocomprobante && !seriecomprobante && !tipocomprobante)
        throw new NotFoundException('No hay datos para actulizar.');
      if(numerocomprobante) comprobanteBD.numerocomprobante = numerocomprobante;
      if(seriecomprobante) comprobanteBD.seriecomprobante = seriecomprobante;
      if(tipocomprobante) comprobanteBD.tipocomprobante = tipocomprobante;
/*       comprobanteBD.updateOne(updateComprobanteDto)
 */      comprobanteBD.updatedAt = new Date().getTime();
      return await comprobanteBD.save();
    } catch (error) {
      throw new NotFoundException('Error al actualizar el comprobante.')
    }
  }else{
    throw new NotFoundException('El id no es un objeto valido')
  }
   
  }
  async remove(id: string): Promise<string> {
    if(isValidObjectId(id)){
      try {
        const comprobanteBD = await this.findOne(id);
        comprobanteBD.estado = false;
        await comprobanteBD.save();
        return `Comprobante con id ${id} eliminado.`;
      } catch (error) {
        throw new NotFoundException('Error al eliminar el comprobante.')
      }
    }else{
      throw new NotFoundException('El id no es un objeto valido')
    }
  }
}
