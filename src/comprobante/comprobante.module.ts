import { Module } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { ComprobanteController } from './comprobante.controller';
import { Comprobante, SchemaComprobante } from './entities/comprobante.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ComprobanteController],
  providers: [ComprobanteService],
  imports: [
    MongooseModule.forFeature([{ name: Comprobante.name, schema: SchemaComprobante}])
  ]
})
export class ComprobanteModule {}
