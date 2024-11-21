import { Type } from 'class-transformer';
import { IsInt, IsDecimal, Min, IsNotEmpty, ValidateNested, IsArray, ArrayNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { CreateProductoDto } from 'src/productos/dto/create-producto.dto';
import { Producto } from 'src/productos/entities/producto.entity';

export class CreateDetalleVentaDto {

  @IsInt()
  @Min(1)
  cantidadprod: number;
 
  @IsNumber({maxDecimalPlaces: 2})
  @Min(1)
  subtotal: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  productosAsociados: string[];

}
