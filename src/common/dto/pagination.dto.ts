import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive, Min } from "class-validator";
import { Sort, SortField } from "../enums";

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
}