import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";


@Injectable()
export class ParseMongoIdPipe implements PipeTransform{

    transform(value: string, metadata: ArgumentMetadata) {
        if(!isValidObjectId){
            throw new BadRequestException(`${value} no es un MongoId válido`)
        }

        return value
    }

}