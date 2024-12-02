import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/create-persona.dto";
import { Persona } from "src/persona/entities/persona.entity";


export class CreateUsuarioDto {

    @IsString()
    @MinLength(8)
    usuario: string;

    @IsString()
    @MinLength(6)
    contrasena?: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>CreatePersonaDto)
    idpersona: Persona;

    @IsOptional()
    @IsString() 
    rol: string;
}
