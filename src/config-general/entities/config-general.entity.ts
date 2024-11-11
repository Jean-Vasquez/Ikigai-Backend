import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

enum Comprobante {
    "Boleta",
    "Factura"
}

@Schema()
export class ConfigGeneral extends Document{



        @Prop({
            unique:true,
            required: true,
        })
        nomcomprobante: Comprobante
    

        @Prop({
            unique:true,
            required: true,
            default: ("BOO-00")
        })
        sercomprobante: string;


        @Prop({
            unique:true,
            required: true,
            default :("1")
            
        })
        increcomprobante: number;

}



export const ConfigSchema = SchemaFactory.createForClass(ConfigGeneral)