import { Type } from "class-transformer";
import { IsEnum, IsOptional, Min } from "class-validator";
import { Categoria, Sort, SortField } from "../enums";

export class PaginationDto {

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset: number;

    @IsOptional()
    @IsEnum(SortField)
    sortField: SortField

    @IsOptional()
    @IsEnum(Sort)
    sortOrder: Sort

    @IsOptional()
    @IsEnum(Categoria)
    categoria: Categoria
}