import { Module } from '@nestjs/common';
import { ConfigGeneralService } from './config-general.service';
import { ConfigGeneralController } from './config-general.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigGeneral, ConfigSchema } from './entities/config-general.entity';

@Module({
  controllers: [ConfigGeneralController],
  providers: [ConfigGeneralService],
  imports:[
    MongooseModule.forFeature([{
      name: ConfigGeneral.name,
      schema: ConfigSchema
    }])
  ]
})
export class ConfigGeneralModule {}
