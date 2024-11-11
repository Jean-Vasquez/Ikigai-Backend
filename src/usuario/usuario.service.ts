import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel : Model<Usuario>,

    @InjectModel(Persona.name)
    private readonly personaModel : Model<Persona>
  ){}

  async create({idpersona,...createUsuarioDto}: CreateUsuarioDto) {
    try{
      if(idpersona){
        const persona = new this.personaModel(idpersona)
        const personaSave = await persona.save()
        const newUsuario = new this.usuarioModel({...CreateUsuarioDto, idpersona: personaSave._id})
        return newUsuario.save()
      }
    }catch(error){
      console.log(error)
    }
  }

  async findAll() {
    return await this.usuarioModel.find().populate('idpersona');
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
