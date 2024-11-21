import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema} from './entities/producto.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService, CommonService],
  imports:[
    MongooseModule.forFeature([{
        name: Producto.name,
        schema: ProductoSchema 
    }
  ])
  ]
})
export class ProductosModule {}
