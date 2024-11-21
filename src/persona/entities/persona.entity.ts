import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Tipodoc } from "src/common/enums";

@Schema()
export class Persona extends Document{

    @Prop({unique:true})
    numerodoct:string;

    @Prop({required:true})
    nombres: string;
    
    @Prop({required:true})
    apellidos: string;

    @Prop({
        required:true,
        enum: Tipodoc})
    tipodoc: Tipodoc;

    @Prop({required:true, type:Date})
    fechanaci: Date;

    @Prop({required:true})
    direccion: string;

    @Prop()
    telefono?: string;

    @Prop()
    correo?: string;

    @Prop({default: true})
    estado?:boolean;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);