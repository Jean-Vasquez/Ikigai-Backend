import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { MetodoPago } from "src/common/enums";

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetalleVenta' }] })
  detalleVenta: Types.Array<Types.ObjectId>;

}

export const VentaSchema = SchemaFactory.createForClass(Venta)
