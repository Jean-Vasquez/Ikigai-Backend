import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class ConfigGeneral extends Document{

        @Prop({ required: true,  default: 1})
        noActual: number;
    
        @Prop({ required: true, default: 'B001'})
        serie: string;

        @Prop({ required: true, default: 1 })
        incremento: number;

}

export const ConfigSchema = SchemaFactory.createForClass(ConfigGeneral)