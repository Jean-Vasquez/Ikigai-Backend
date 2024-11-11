import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DetalleVentaDocument = DetalleVenta & Document;

@Schema()
export class DetalleVenta {

  @Prop({ required: true })
  iddetalleventa: number;

  //@Prop({ required: true })
  //idproducto: number;

  //@Prop({ type: Number, required: true })
  //precioprod: number;

  @Prop({ type: Number, required: true })
  cantidadprod: number;

  @Prop({ type: Number, required: true })
  subtotal: number;
}

export const DetalleVentaSchema = SchemaFactory.createForClass(DetalleVenta);
