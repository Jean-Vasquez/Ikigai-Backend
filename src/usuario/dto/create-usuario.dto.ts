import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Rol } from "src/common/enums";
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
    @Type(() => CreatePersonaDto)
    idpersona: Persona;

    @IsOptional()
    @IsEnum(Rol)
    rol: Rol;
}
