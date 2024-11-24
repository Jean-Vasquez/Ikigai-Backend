import { IsInt, Min, IsNotEmpty, IsString } from 'class-validator';
export class CreateDetalleVentaDto {

  @IsInt()
  @Min(1)
  cantidadprod: number;

  @IsNotEmpty()
  @IsString()
  idproducto: string;

}
