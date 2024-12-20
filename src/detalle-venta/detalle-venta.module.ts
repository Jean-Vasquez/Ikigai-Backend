import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { DetalleVenta, DetalleVentaSchema } from './entities/detalle-venta.entity';
import { CommonService } from 'src/common/common.service';
import { Producto, ProductoSchema } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetalleVenta.name,
      schema: DetalleVentaSchema }
    ]),
    ProductosModule
  ],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService, CommonService],
  exports:[MongooseModule, DetalleVentaService]
})
export class DetalleVentaModule {}
