import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator"

export class CreateProductoDto {

    @IsString()
    @MinLength(1)
    nombre: string

    @IsString()
    @MinLength(1)
    imagen:string

    @IsString()
    @MinLength(1)
 
    descripcion:string

    @IsString()
    @MinLength(1)

    categoria: string

    @IsNumber()
    @Min(1)
    presentacion:number

    @IsDecimal()
    @Min(1)
    precio:number

    @IsNumber()
    @Min(1)
    stock:number

    @IsBoolean()
    @MinLength(1)
    estado:boolean;


}
