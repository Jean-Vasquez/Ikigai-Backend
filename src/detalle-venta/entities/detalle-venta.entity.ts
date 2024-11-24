import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class DetalleVenta extends Document{

  @Prop({ required: true })
  cantidadprod: number;
  
  @Prop({required:true})
  subtotal: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  })
  idproducto: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Venta',})
  idventa: string;
  
  _id: string;
}

export const DetalleVentaSchema = SchemaFactory.createForClass(DetalleVenta);
