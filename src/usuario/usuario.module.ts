import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { Persona, PersonaSchema } from 'src/persona/entities/persona.entity';


@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [
    MongooseModule.forFeature([{
      name: Usuario.name,
      schema: UsuarioSchema
    },
  {
    name: Persona.name,
    schema: PersonaSchema
  }])
  ]
})
export class UsuarioModule {}
