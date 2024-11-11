import { IsInt, IsDecimal, Min } from 'class-validator';

export class CreateDetalleVentaDto {
  
  // Valida que el valor de `iddetalleventa` sea un número entero.
  @IsInt()
  iddetalleventa: number;
  
  @IsInt()
  idventa: number;

 // @IsInt()
  //idproducto: number;

  //@IsDecimal()
  //precioprod: number;

  @IsInt()
  //asegura que el valor mínimo permitido sea 1
  @Min(1)
  cantidadprod: number;
 // Valida que el valor de subtotal sea un número decimal.
  @IsDecimal()
  subtotal: number;
}
