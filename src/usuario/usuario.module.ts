import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { Persona, PersonaSchema } from 'src/persona/entities/persona.entity';
import { CommonService } from 'src/common/common.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, CommonService],
  imports: [
    ConfigModule.forRoot()
    ,MongooseModule.forFeature([{
      name: Usuario.name,
      schema: UsuarioSchema
    },
  {
    name: Persona.name,
    schema: PersonaSchema
  }]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SEED,
    signOptions: {expiresIn: '6h'}    
  })
  ]
})
export class UsuarioModule {}
