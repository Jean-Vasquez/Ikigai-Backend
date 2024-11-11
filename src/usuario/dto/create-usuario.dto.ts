import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/create-persona.dto";


export class CreateUsuarioDto {

    @IsString()
    @MinLength(8)
    usuario: string;

    @IsString()
    
    contrasena: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>CreatePersonaDto)
    idpersona: CreatePersonaDto;

    @IsOptional()
    @IsIn(["cliente","administrador"])    
    rol: string;
}
