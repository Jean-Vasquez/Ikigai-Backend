import { PartialType } from '@nestjs/mapped-types';
//Esta función se utiliza para crear una versión "parcial" de un DTO, lo que hace 
//todos los campos del DTO original serán opcionales en el nuevo DTO generado.
import { CreateDetalleVentaDto } from './create-detalle-venta.dto';

export class UpdateDetalleVentaDto extends PartialType(CreateDetalleVentaDto) {}
