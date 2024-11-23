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
<<<<<<< HEAD
    @MinLength(8)
    contrasena: string;
=======
    @MinLength(6)
    contrasena?: string;
>>>>>>> e8894db9521f64653273d005fc8b09d2ca960937

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>CreatePersonaDto)
    idpersona: Persona;

    @IsOptional()
    @IsEnum(Rol)    
    rol: Rol;
}
