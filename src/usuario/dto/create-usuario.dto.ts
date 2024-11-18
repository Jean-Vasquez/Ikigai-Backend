import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/create-persona.dto";
import { Persona } from "src/persona/entities/persona.entity";


export class CreateUsuarioDto {

    @IsString()
    @MinLength(8)
    usuario: string;

    @IsString()
    
    contrasena: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>CreatePersonaDto)
    idpersona: Persona;

    @IsOptional()
    @IsIn(["cliente","administrador"])    
    rol: string;
}
