import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, Min } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {

    @IsNumber()
    @Min(0)
    stock?:number
}
