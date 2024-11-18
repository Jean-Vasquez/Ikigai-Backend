import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum MetodoPago{
  Tarjeta = "Tarjeta",
}
@Schema()
export class Venta extends Document{

  @Prop({type: Types.ObjectId, ref: 'usuario', required: true})
  usuario: Types.ObjectId

  @Prop({ required: true, default: () => new Date() })
  fecha: Date; 

  @Prop({required: true})
  total: number;

  @Prop({required: true})
  metpago: string;

}

export const VentaSchema = SchemaFactory.createForClass(Venta)
