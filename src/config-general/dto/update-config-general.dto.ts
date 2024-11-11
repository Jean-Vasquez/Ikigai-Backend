import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigGeneralDto } from './create-config-general.dto';

export class UpdateConfigGeneralDto extends PartialType(CreateConfigGeneralDto) {}
