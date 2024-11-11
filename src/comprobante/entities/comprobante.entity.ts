import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Comprobante extends Document {

    @Prop({ required: true, unique: true })
    seriecomprobante: string;

    @Prop({ required: true, enum: ['boleta', 'factura']})
    tipocomprobante: string;

    @Prop({ required: true })
    numerocomprobante: string;

    //@Prop({ required: true })
    //idventa: string;

    //formato unix
    @Prop()
    createdAt: number;

    @Prop()
    updatedAt?: number

    @Prop()
    estado: boolean;

}

export const SchemaComprobante = SchemaFactory.createForClass(Comprobante);