import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Categoria } from "src/common/enums"

@Schema({timestamps:true})
export class Producto extends Document {

    @Prop({required: true})
    nombre: string

    @Prop({unique: true})
    imagen:string

    @Prop()
    descripcion?:string

    @Prop({
        required: true,
        enum: Categoria
    })
    categoria: Categoria

    @Prop({required: true})
    precio:number

    @Prop({required: true})
    stock:number

}

export const ProductoSchema = SchemaFactory.createForClass(Producto)
