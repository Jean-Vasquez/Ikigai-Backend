import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigGeneralDto } from './dto/create-config-general.dto';
import { UpdateConfigGeneralDto } from './dto/update-config-general.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigGeneral } from './entities/config-general.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ConfigGeneralService {
  
  constructor(
    @InjectModel(ConfigGeneral.name)
    private readonly configModel: Model<ConfigGeneral>
  ){}

  async create(createConfigGeneralDto: CreateConfigGeneralDto) {

    try {
      const config = await this.configModel.create(createConfigGeneralDto)
      return config
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(){
    const config = await this.configModel.find()
    return config
  }

  async update(term: string, updateConfigGeneralDto: UpdateConfigGeneralDto) {
    
    let config: ConfigGeneral

    config = await this.findOne(term)
    
    try {
      await this.configModel.updateOne(updateConfigGeneralDto)
      return {...config.toJSON(),...updateConfigGeneralDto}
    } catch (error) {
      console.log(error)
    }
    
  }

  
  async findOne(term: string) {
    let config: ConfigGeneral

    if(isValidObjectId(term)){
      config = await this.configModel.findById(term)
    }
    if(!config){
      throw new NotFoundException(`No existe registro con el term: ${term}`)
    }
    return config

  }

  remove(term:string){
    
  }


}
