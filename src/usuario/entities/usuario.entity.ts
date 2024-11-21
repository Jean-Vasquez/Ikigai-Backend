import { Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import  mongoose, { Document} from "mongoose";
import { Rol } from "src/common/enums";
import { Persona } from "src/persona/entities/persona.entity";

@Schema()
export class Usuario extends Document{

    @Prop({unique: true})
    usuario: string;

    @Prop()
    contrasena: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    })
    idpersona: Persona;

    @Prop({
        required: true,
        enum: Rol,
        default:"cliente"})
    rol?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
