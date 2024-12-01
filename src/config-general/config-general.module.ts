import { Module } from '@nestjs/common';
import { ConfigGeneralService } from './config-general.service';
import { ConfigGeneralController } from './config-general.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigGeneral, ConfigSchema } from './entities/config-general.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [ConfigGeneralController],
  providers: [ConfigGeneralService, CommonService],
  imports:[
    MongooseModule.forFeature([{
      name: ConfigGeneral.name,
      schema: ConfigSchema
    }])
  ],
  exports:[MongooseModule,ConfigGeneralService]
})
export class ConfigGeneralModule {}
