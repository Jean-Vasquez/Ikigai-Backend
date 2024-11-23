import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venta } from './entities/venta.entity';
import { Model } from 'mongoose';

@Injectable()
export class VentaService {

  constructor(
    @InjectModel(Venta.name)
    private readonly ventaModel: Model<Venta>
  ){}


  async create(createVentaDto: CreateVentaDto) {
    const crearVenta = await this.ventaModel.create(createVentaDto);
    return crearVenta;
  }

  findAll() {
    return this.ventaModel.find().populate('detalleVenta');
  }

  findOne(id: string) {    
    return this.ventaModel.findById(id).populate('detalleVenta');
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    const actualizar = await this.ventaModel.findByIdAndUpdate(id, updateVentaDto);
    return actualizar;
  }

  remove(id: string) {
    return this.ventaModel.findByIdAndDelete(id);
  }
}
