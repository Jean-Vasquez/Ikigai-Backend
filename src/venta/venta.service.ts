import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venta } from './entities/venta.entity';
import { Model } from 'mongoose';
import { DetalleVenta } from 'src/detalle-venta/entities/detalle-venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CommonService } from 'src/common/common.service';
import { DetalleVentaService } from 'src/detalle-venta/detalle-venta.service';
import { ComprobanteService } from 'src/comprobante/comprobante.service';
@Injectable()
export class VentaService {

  constructor(
    @InjectModel(Venta.name)
    private readonly ventaModel: Model<Venta>,

    private commonService : CommonService,

    private readonly detalleVentaService : DetalleVentaService,

    private readonly comprobanteService : ComprobanteService
  ){}


  async create(createVentaDto: CreateVentaDto) {
   try{

    const {detalleVenta, usuario, metpago} = createVentaDto

    let total = 0

    let nuevaVenta = new this.ventaModel({
      usuario,
      metpago,
      total,
      detalleVenta: []
    });

    for(const detalle of detalleVenta){
      
      const detVentCreado = await this.detalleVentaService.create(detalle)
      total += detVentCreado.subtotal
      nuevaVenta.detalleVenta.push(detVentCreado._id)
    }
    nuevaVenta.total = total
    
    const ventaGuardada = await nuevaVenta.save()

    await this.comprobanteService.create(ventaGuardada._id.toString())

    return await ventaGuardada.populate([
      {
        path: 'usuario',
        select: 'idpersona',
        populate: {
          path: 'idpersona',
          select: 'numerodoct nombres apellidos tipodoc direccion',
        },
      },
      {
        path: 'detalleVenta',
        model: 'DetalleVenta',
        populate: {
          path: 'idproducto',
          select: 'nombre precio',
        },
      },
    ]);

   }catch(error){
    this.commonService.handleExceptions(error)
   }
  }

  async findAll() {

    try{
      return await this.ventaModel.find().populate({
        path: 'usuario',
        select: 'idpersona',
        populate: { path: 'idpersona', select: 'numerodoct nombres apellidos tipodoc direccion' },
      })
      .populate({
        path: 'detalleVenta',
        model: 'DetalleVenta',
        populate: { path: 'idproducto', select: 'nombre precio' },
      });
    }catch(error){
      this.commonService.handleExceptions(error)
    }
    
  }

  async findOne(id: string) {    
    
    try{
      const venta = await this.ventaModel.findById(id)
      .populate({
        path: 'usuario',
        select: 'idpersona',
        populate: { path: 'idpersona', select: 'numerodoct nombres apellidos tipodoc direccion' },
      })
      .populate({
        path: 'detalleVenta',
        model: 'DetalleVenta',
        populate: { path: 'idproducto', select: 'nombre precio' },
      });

      if(!venta){
        throw new NotFoundException(`Venta con id ${id} no encontrada`)
      }

      return venta
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

}
