import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Document } from "mongoose"

@Schema()
export class Producto extends Document {

    @Prop()
    nombre: string

    @Prop({unique: true})
    imagen:string

    @Prop()
    descripcion:string

    @Prop()
    categoria: string

    @Prop()
    presentacion:number

    @Prop()
    precio:number

    @Prop()
    stock:number

    @Prop()
    estado:boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto)
