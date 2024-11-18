import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Persona, PersonaSchema } from './entities/persona.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [PersonaController],
  providers: [PersonaService, CommonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Persona.name,
        schema: PersonaSchema
      }
    ])
  ]
})
export class PersonaModule {}
