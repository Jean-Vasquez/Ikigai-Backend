import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateVentaDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    @MinLength(1)
    total: number;

    @IsString()
    @IsNotEmpty()
    metpago: string;
}
