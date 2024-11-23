import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Producto } from 'src/productos/entities/producto.entity';

@Schema()
export class DetalleVenta extends Document{

  @Prop({ required: true })
  cantidadprod: number;
  
  @Prop()
  subtotal: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto'
  })
  idproducto: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, 
    ref: 'Venta'})
  idventa: string;
  
}

export const DetalleVentaSchema = SchemaFactory.createForClass(DetalleVenta);
