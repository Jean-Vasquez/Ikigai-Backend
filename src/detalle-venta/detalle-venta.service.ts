import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
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

  async create(createDetalleVentaDto: CreateDetalleVentaDto){

    const {idproducto, cantidadprod, subtotal} = createDetalleVentaDto;

    try{

      if(!isValidObjectId(idproducto)){
        throw new BadRequestException('El id del producto no es un ObjectId válido')
      }

      const producto = await this.productoModel.findById(idproducto);

      if(!producto){
        throw new NotFoundException(`El producto con id ${idproducto} no existe`)
      }

      if(producto.stock < cantidadprod){
        throw new BadRequestException(`El stock del producto (${producto.stock}) es insuficiente para la cantidad solicitud `)
      }

      const subtotal = producto.precio * cantidadprod;

      const detVent = new this.detalleVentaModel({
        cantidadprod,
        subtotal,
        idproducto
      });

      const detVentGuardado = await detVent.save();

      producto.stock -= cantidadprod;
      await producto.save();

      return detVentGuardado.populate('idproducto');

    }catch(error){
      this.commonService.handleExceptions(error)
    };
  } 

  async findAll(){

  try {
    return await this.detalleVentaModel.find().populate('idproducto');
  } catch (error) {
    this.commonService.handleExceptions(error)
  }   

  }

  async findOne(id: string){

    let detVent : DetalleVenta

    if(isValidObjectId(id)){
      detVent = await this.detalleVentaModel.findById(id)
    } 
    if(!id){
      throw new NotFoundException(`Detalle de venta con id "${id}" no encontrado`)
    }

    return detVent
  }


}
