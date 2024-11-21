import { IsInt, Min, IsNotEmpty, IsNumber, IsString, IsOptional,  } from 'class-validator';
export class CreateDetalleVentaDto {

  @IsInt()
  @Min(1)
  cantidadprod: number;
 
  @IsOptional()
  @IsNumber({maxDecimalPlaces: 2})
  subtotal: number;

  @IsNotEmpty()
  @IsString()
  idproducto: string;

}
