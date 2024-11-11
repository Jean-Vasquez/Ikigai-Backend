import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, VentaSchema } from './entities/venta.entity';


@Module({ 
  imports: [
    MongooseModule.forFeature([{
      name: Venta.name,
      schema: VentaSchema

    }])
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
