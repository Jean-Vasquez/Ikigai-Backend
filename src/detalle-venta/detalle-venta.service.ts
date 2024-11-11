import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetalleVenta,DetalleVentaDocument } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

//Este decorador marca la clase `DetalleVentaService` como un servicio que puede ser inyectado en otros componentes (como controladores) dentro de la aplicación.
@Injectable()
export class DetalleVentaService {
  constructor(
    //decorador para inyectar el modelo de Mongoose 
    @InjectModel(DetalleVenta.name) private detalleVentaModel: Model<DetalleVentaDocument>,
  ) {}

  //Crea un nuevo detalle de venta.
  async create(createDetalleVentaDto: CreateDetalleVentaDto): Promise<DetalleVenta> {
    const createdDetalleVenta = new this.detalleVentaModel(createDetalleVentaDto);
    return createdDetalleVenta.save();
  }

  //Recupera todos los detalles de venta.
  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleVentaModel.find().exec();
  }

  // Recupera un detalle de venta por su `id`.
  async findOne(id: string): Promise<DetalleVenta> {
    return this.detalleVentaModel.findById(id).exec();
  }

  //Actualiza un detalle de venta existente.
  async update(id: string, updateDetalleVentaDto: UpdateDetalleVentaDto): Promise<DetalleVenta> {
    return this.detalleVentaModel.findByIdAndUpdate(id, updateDetalleVentaDto, { new: true }).exec();
  }
  //Elimina un detalle de venta por su `id`.
  async remove(id: string): Promise<DetalleVenta> {
    return this.detalleVentaModel.findByIdAndDelete(id).exec();
  }
}
