import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './create-venta.dto';
import { IsOptional } from 'class-validator';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    @IsOptional()
    fecha?: Date;

    @IsOptional()
    total?: number;

    @IsOptional()
    metpago?: string;
}
