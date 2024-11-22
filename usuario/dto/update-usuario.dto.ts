import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { Type } from 'class-transformer';
import { UpdatePersonaDto } from 'src/persona/dto/update-persona.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Persona } from 'src/persona/entities/persona.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsOptional()
    @ValidateNested()
    @Type(()=>UpdatePersonaDto)
    idpersona?: Persona;
}
