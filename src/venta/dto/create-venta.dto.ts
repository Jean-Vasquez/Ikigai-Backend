import { IsDate, IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { MetodoPago } from "../entities/venta.entity";

export class CreateVentaDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    total: number;

    @IsEnum(MetodoPago)
    @IsNotEmpty()
    metpago: string;
}
