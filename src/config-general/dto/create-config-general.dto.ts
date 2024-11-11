import { IsNotEmpty, IsPositive, IsString, Min, MinLength } from "class-validator";


export class CreateConfigGeneralDto {


    @IsString()
    @MinLength(1)
    nomcomprobante: string;

    @IsString()
    @MinLength(1)
    sercomprobante: string;

    @IsString()
    @IsPositive()
    @Min(1)
    increcomprobante: number;
}
