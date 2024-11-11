import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Persona extends Document{

    @Prop({unique:true, index:true})
    numerodoct:string;

    @Prop({required:true})
    nombres: string;
    
    @Prop({required:true})
    apellidos: string;

    @Prop({required:true, enum: ["DNI", "PASAPORTE", "CARNET_EXTRANJERIA"]})
    tipodoc: string;

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