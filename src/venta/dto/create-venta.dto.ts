import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { MetodoPago } from "src/common/enums";

export class CreateVentaDto {
    @IsDateString()
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
