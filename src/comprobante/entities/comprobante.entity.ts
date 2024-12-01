import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
export class Comprobante extends Document {

    @Prop({ required: true})
    seriecomprobante: string;

    @Prop({ required: true, unique: true})
    numerocomprobante: string;

    @Prop({ required: true, default:'Boleta'})
    tipocomprobante: string;

    @Prop({ type: Types.ObjectId, ref: 'Venta', required: true })
    idventa: Types.ObjectId;

}

export const SchemaComprobante = SchemaFactory.createForClass(Comprobante);