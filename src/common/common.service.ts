import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class CommonService {

    private readonly logger = new Logger(CommonService.name);

    public handleExceptions(error:any){
    
    if(error.code === 11000){
      this.logger.warn(`Duplicate entry detected: ${JSON.stringify(error.keyValue)}`)
      throw new BadRequestException(`This exist in the db "${JSON.stringify(error.keyValue)}"`)
    }
      this.logger.error(error)
      throw new InternalServerErrorException(`Can't create Person - Check server logs`)
    }
}
