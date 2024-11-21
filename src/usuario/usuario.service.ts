import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { isValidObjectId, Model } from 'mongoose';
import { Persona } from 'src/persona/entities/persona.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel : Model<Usuario>,

    @InjectModel(Persona.name)
    private readonly personaModel : Model<Persona>,

    private commonService : CommonService
  ){}

  async create({idpersona,...createUsuarioDto}: CreateUsuarioDto) {
    try{
      if(idpersona){
        const persona = new this.personaModel(idpersona)
        const personaSave = await persona.save()
        const newUsuario = new this.usuarioModel({...createUsuarioDto, idpersona: personaSave._id})
        return newUsuario.save()
      }
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.usuarioModel.find().populate('idpersona');
  }

  async findOne(term: string) {

    let usuario: Usuario

    if(isValidObjectId(term)){
      usuario = await this.usuarioModel.findById(term)
    }
    if(!usuario){
      usuario = (await this.usuarioModel.findOne({usuario:term.trim()}))
    }
    if(!usuario){
      throw new NotFoundException(`usuario con id o nombre de usuario "${term}" no encontrado`)
    }

    return usuario.populate('idpersona')
  }

  async update(term: string, updateUsuarioDto: UpdateUsuarioDto) {

    try{

      const usuario = await this.findOne(term)
      const { idpersona: personaData, ...restoUsuarioData } = updateUsuarioDto;

      if(personaData){

        await this.personaModel.findByIdAndUpdate(
          usuario.idpersona,
          personaData,
          {
            new:true
          }
        )
      }

      const usuarioupdated = await this.usuarioModel.findByIdAndUpdate(
        usuario._id,
        restoUsuarioData,
        {
          new:true
        }
      ).populate('idpersona');
      
      return usuarioupdated;

    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    
    try{

      if(!isValidObjectId(id)){
        throw new BadRequestException(`El id ${id} no es un formato válido`)
      }

      const usuario = await this.usuarioModel.findById(id).populate('idpersona');

      if(!usuario){
        throw new NotFoundException(`usuario con id "${id}" no encontrado`)
      }

      await this.personaModel.findByIdAndDelete(usuario.idpersona);
      await this.usuarioModel.findByIdAndDelete(id);

      return usuario

    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }
}
