import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { CommonService } from 'src/common/common.service';
import { Producto } from 'src/productos/entities/producto.entity';
@Injectable()
export class DetalleVentaService {

  constructor(
    @InjectModel(DetalleVenta.name)
    private detalleVentaModel: Model<DetalleVenta>,
    @InjectModel(Producto.name)
    private productoModel: Model<Producto>,
    private commonService : CommonService
  ) {}

  /* async create({productosAsociados, ...createDetalleVentaDto}: CreateDetalleVentaDto){
    try{

      const findProduct = await this.productoModel.find(productosAsociados)
      if(!findProduct) throw new NotFoundException('Uno o más productos no existen en la base de datos');
      
      const calcularSubT = findProduct.reduce((sum, producto)=> {
        return sum + producto.precio;
      }, 0);
      
      const newDetVent = new this.detalleVentaModel({
        ...createDetalleVentaDto,
        productosAsociados,
        subtotal: createDetalleVentaDto.subtotal || calcularSubT,
      });

      return await newDetVent.save()
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  } */

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
