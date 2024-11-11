import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { DetalleVenta, DetalleVentaSchema } from './entities/detalle-venta.entity';

@Module({
  // `DetalleVenta` es la clase que define la estructura de los detalles de venta
  //mientras que `DetalleVentaSchema` es el esquema de Mongoose que mapea esa estructura a la base de datos.
  imports: [
    MongooseModule.forFeature([{ name: DetalleVenta.name, schema: DetalleVentaSchema }]),
  ],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule {}
