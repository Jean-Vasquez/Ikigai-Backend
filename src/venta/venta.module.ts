import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, VentaSchema } from './entities/venta.entity';
import { DetalleVentaModule } from 'src/detalle-venta/detalle-venta.module';
import { CommonService } from 'src/common/common.service';
import { ProductosModule } from 'src/productos/productos.module';


@Module({ 
  imports: [
    MongooseModule.forFeature([{
      name: Venta.name,
      schema: VentaSchema
    }
  ]),
  ProductosModule,
  DetalleVentaModule
 ],
  controllers: [VentaController],
  providers: [VentaService, CommonService ],
})
export class VentaModule {}
