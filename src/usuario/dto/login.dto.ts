import { IsString, MinLength } from "class-validator";

export class loginDto{
 
    @IsString()
    @MinLength(8)
    usuario: string;

    @IsString()
    @MinLength(6)
    contrasena: string;
    
}