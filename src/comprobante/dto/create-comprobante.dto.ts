import { IsNotEmpty, IsString} from "class-validator";

export class CreateComprobanteDto {

@IsNotEmpty()
@IsString()
idventa: string;

}
