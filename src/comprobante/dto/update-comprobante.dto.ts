import { PartialType } from '@nestjs/mapped-types';
import { CreateComprobanteDto } from './create-comprobante.dto';

export class UpdateComprobanteDto extends PartialType(CreateComprobanteDto) {}
