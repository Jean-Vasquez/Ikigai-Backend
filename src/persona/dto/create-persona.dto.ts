import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, 
    MaxLength, MinLength, ValidateIf } from "class-validator";
import { Tipodoc } from "src/common/enums";
    
    
    export class CreatePersonaDto {
    
        @IsString()
        @MaxLength(12)
        @MinLength(8)
        numerodoct:string;
    
        @IsString()
        @MinLength(1)
        nombres: string;
    
        @IsString()
        @MinLength(1)
        apellidos: string;
        
        @IsEnum(Tipodoc)
        tipodoc: Tipodoc;
    
        @IsDateString()
        @IsNotEmpty()
        @ValidateIf((o) => o.fechanaci) //Valida si existe la fecha
        //MinDate no funciona correctamente - solo acepta tipo date xd
        //falta validar que sea mayor de edad para registrarse
        fechanaci: string;
    
        @IsString()
        @MinLength(1)
        direccion: string;
    
        @IsString()
        @IsOptional()
        telefono: string;
    
        @IsEmail()
        @IsOptional()
        correo: string;
        
        @IsOptional()
        @IsBoolean()
        estado:boolean;
    }
    