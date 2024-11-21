import { Module } from '@nestjs/common';
import { PersonaModule } from './persona/persona.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductosModule } from './productos/productos.module';
import { ConfigGeneralModule } from './config-general/config-general.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ComprobanteModule } from './comprobante/comprobante.module';
import { CommonModule } from './common/common.module';
import { DetalleVentaModule } from './detalle-venta/detalle-venta.module';
import { VentaModule } from './venta/venta.module';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: 
  [
    ConfigModule.forRoot()
    ,
    MongooseModule.forRoot("mongodb://localhost:27017/nest-ikigai"),

    PersonaModule,

    ProductosModule,

    ConfigGeneralModule,

    UsuarioModule,

    ComprobanteModule,

    CommonModule,

    DetalleVentaModule,

    VentaModule
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
