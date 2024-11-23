import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator"
import { Categoria } from "src/common/enums"

export class CreateProductoDto {

    @IsString()
    @MinLength(1)
    nombre: string

    @IsString()
    @MinLength(1)
    imagen:string

    @IsString()
    @IsOptional()
    descripcion:string

    @IsEnum(Categoria)
    categoria: Categoria

    @IsNumber({maxDecimalPlaces: 2})
    @IsPositive()
    precio:number

    @IsNumber()
    @IsPositive()
    @Min(1)
    stock:number

    @IsOptional()
    @IsBoolean()
    estado:boolean;


}
