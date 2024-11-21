import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import { isValidObjectId, Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class PersonaService {

  constructor(
    @InjectModel(Persona.name)
    private readonly personaModel : Model<Persona>,
    private commonService : CommonService
  ){}

  async create(createPersonaDto: CreatePersonaDto) {
    try{
      const persona = await this.personaModel.create(createPersonaDto)
      return persona;
    }catch(error){
      this.commonService.handleExceptions(error)
    };
  }

  async findAll() {
    try {
      const personas = await  this.personaModel.find()
      return personas;
    } catch (error) {
      this.commonService.handleExceptions(error)
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
      throw new NotFoundException(`Persona con id o N°doc "${term}" no encontrada`)
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
      this.commonService.handleExceptions(error)
    }
    
  }

  async remove(id: string) {

    try{
      if(!isValidObjectId(id))
        {
           throw new BadRequestException(`El id ${id} no es un formato válido`)
        } 
      
        const personEliminada = await this.personaModel.findByIdAndDelete(id)

        if(!personEliminada){
          throw new NotFoundException(`Persona con id ${id} no existe`)
        }
        return personEliminada
        
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

  


}


