import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { CommonService } from 'src/common/common.service';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/productos.service';
@Injectable()
export class DetalleVentaService {

  constructor(
    @InjectModel(DetalleVenta.name)
    private detalleVentaModel: Model<DetalleVenta>,

    @InjectModel(Producto.name)
    private productoModel: Model<Producto>,

    private commonService : CommonService,

    private readonly productoService : ProductosService
  ) {}

  async create(createDetalleVentaDto: CreateDetalleVentaDto){

    const {idproducto, cantidadprod} = createDetalleVentaDto;

    try{

      const producto = await this.productoService.findOne(idproducto)

      if(producto.stock < cantidadprod){
        throw new BadRequestException(`El stock del producto (${producto.stock}) es insuficiente para la cantidad solicitud `)
      }

      const subtotal = producto.precio * cantidadprod;

      const detVent = new this.detalleVentaModel({
        cantidadprod,
        subtotal,
        idproducto,
      });

      const detVentGuardado = await detVent.save();

      producto.stock -= cantidadprod;
      await producto.save();

      return detVentGuardado;

    }catch(error){
      this.commonService.handleExceptions(error)
    };
  } 

  async findAll(){

  try {
    return await this.detalleVentaModel
    .find()
    .populate('idproducto');
  } catch (error) {
    this.commonService.handleExceptions(error)
  }   

  }

  async findOne(id: string){

    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException(`Detalle de venta con id "${id}" no encontrado`);
      }

      const detVent = await this.detalleVentaModel
      .findById(id)
      .populate('idproducto');   
      
    if(!detVent){
      throw new NotFoundException(`Detalle de venta con id "${id}" no encontrado`)
    }

    return detVent
  } catch (error){
    this.commonService.handleExceptions(error)
  }
}
}