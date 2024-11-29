import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, 
    MaxLength, MinLength, Validate, ValidateIf } from "class-validator";
import { Tipodoc } from "src/common/enums";
import { ValidateDateOfBirth } from "src/common/Validaciones/validate-date-of-birth";
    
    
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
    
        @IsNotEmpty()
        @IsDateString()  // Validación para asegurarse de que sea una fecha
        @Validate(ValidateDateOfBirth)  // Validación personalizada para verificar si la persona tiene 18 años
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
    