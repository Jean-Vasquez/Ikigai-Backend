import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PersonaService {

  constructor(
    @InjectModel(Persona.name)
    private readonly personaModel : Model<Persona>
  ){}

  async create(createPersonaDto: CreatePersonaDto) {
    try{
      const persona = await this.personaModel.create(createPersonaDto)
      return persona;
    }catch(error){
      this.handleExceptions(error)
    };
  }

  async findAll() {
    try {
      const personas = await  this.personaModel.find()
      return personas;
    } catch (error) {
      this.handleExceptions(error)
    } 
  }

  async findOne(term: string) {

    let persona : Persona
    
    if(isValidObjectId(term)){
      persona = await this.personaModel.findById(term)
    } 

    if(!persona){
      persona = await this.personaModel.findOne({numerodoct:term.trim()})
    }
    
    if(!persona){
      throw new NotFoundException(`persona whith id or N°doc "${term}" not found`)
    }

    return persona
  }

  async update(term: string, updatePersonaDto: UpdatePersonaDto) {
    
    let persona : Persona

    persona = await this.findOne(term) 
    try {
      await persona.updateOne(updatePersonaDto)
      return {...persona.toJSON(), ...updatePersonaDto}  
    } catch (error) {
      this.handleExceptions(error)
    }
    
  }

  async remove(term: string) {

    if(isValidObjectId(term))
      {
         await this.personaModel.findByIdAndDelete(term)
      } 
      return this.findAll()  
  }

  private readonly logger = new Logger(PersonaService.name);

  private handleExceptions(error:any){
    
    if(error.code === 11000){
      this.logger.warn(`Duplicate entry detected: ${JSON.stringify(error.keyValue)}`)
      throw new BadRequestException(`This exist in the db "${JSON.stringify(error.keyValue)}"`)
    }
      this.logger.error(error)
      throw new InternalServerErrorException(`Can't create Person - Check server logs`)
    }


}


