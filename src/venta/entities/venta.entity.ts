import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum MetodoPago{
  Tarjeta = "Tarjeta",
}
@Schema()
export class Venta extends Document{

  @Prop({type: Types.ObjectId, ref: 'Usuario', required: true})
  usuario: Types.ObjectId

  @Prop({ required: true, type: Date})
  fecha: Date; 

  @Prop({required: true})
  total: number;

  @Prop({required: true, enum: MetodoPago})
  metpago: MetodoPago;

}

export const VentaSchema = SchemaFactory.createForClass(Venta)
