import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { MetodoPago } from "src/common/enums";
import { CreateDetalleVentaDto } from "src/detalle-venta/dto/create-detalle-venta.dto";

export class CreateVentaDto {

    @IsNotEmpty()
    @IsString()
    usuario: string

    @IsNotEmpty()
    @IsEnum(MetodoPago)
    metpago: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => CreateDetalleVentaDto)
    detalleVenta: CreateDetalleVentaDto[]
}
