import { IsEnum, IsString, MinLength } from "class-validator";

export class CreateComprobanteDto {

    @IsString()
    @MinLength(1)
    seriecomprobante: string;

    @IsEnum(['boleta', 'factura'])
    tipocomprobante: string;

    @IsString()
    @MinLength(1)
    numerocomprobante: string;

    /*@IsString()
    @MinLength(1)
    idventa: string;*/
    //clave foranea
}
