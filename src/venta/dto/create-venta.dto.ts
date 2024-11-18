import { IsDate, IsEnum, IsNotEmpty, IsNumber, MinLength } from "class-validator";
import { MetodoPago } from "../entities/venta.entity"; 

export class CreateVentaDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    @MinLength(1)
    total: number;

    @IsEnum(MetodoPago)
    @IsNotEmpty()
    metpago: MetodoPago;
}
