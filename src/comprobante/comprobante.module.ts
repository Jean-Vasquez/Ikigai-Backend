import { Module } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { ComprobanteController } from './comprobante.controller';
import { Comprobante, SchemaComprobante } from './entities/comprobante.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';
import { ConfigGeneralModule } from 'src/config-general/config-general.module';

@Module({
  controllers: [ComprobanteController],
  providers: [ComprobanteService,CommonService],
  imports: [
    MongooseModule.forFeature([{
       name: Comprobante.name, schema: SchemaComprobante
      }]),
      ConfigGeneralModule
  ],
  exports:[MongooseModule, ComprobanteService]
})
export class ComprobanteModule {}
