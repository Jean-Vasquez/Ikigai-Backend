import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { isValidObjectId, Model } from 'mongoose';
import { Persona } from 'src/persona/entities/persona.entity';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './interfaces/JWT.interface';
import { loginDto } from './dto/login,dto';
import * as bcryptjs from 'bcrypt'


@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel : Model<Usuario>,

    @InjectModel(Persona.name)
    private readonly personaModel : Model<Persona>,

    private commonService : CommonService,

    private jwtService: JwtService

  ){}

  async create({idpersona,...createUsuarioDto}: 
    CreateUsuarioDto): Promise<Usuario> {
    try{
      if(idpersona){
      
        const persona = new this.personaModel(idpersona)
        const personaSave = await persona.save()

        const {contrasena, ...dtoUsuario} = createUsuarioDto

        const newUsuario = new this.usuarioModel({
          contrasena: bcryptjs.hashSync(contrasena,10)
          ,...dtoUsuario,
           idpersona: personaSave._id
          })

         await newUsuario.save()

          const {contrasena:_, ...restUsuario} = newUsuario.toJSON()

         
         return restUsuario

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
        throw new BadRequestException(`Formato de id inválido`)
      }

      const usuario = await this.usuarioModel.findById(id);

      if(!usuario){
        throw new NotFoundException(`usuario con id "${id}" no encontrado`)
      }

      await this.personaModel.findByIdAndDelete(usuario.idpersona);
      await this.usuarioModel.findByIdAndDelete(id);

      return "Usuario y persona asociada eliminados exitosamente"

    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }



  async loginUser(dtoLogin: loginDto){
    
    const {usuario, contrasena} = dtoLogin

    const user = await  this.usuarioModel.findOne({usuario});

    
    if(!user){
      throw new UnauthorizedException(`No existe el usuario: ${user}`)
    }

    if(!bcryptjs.compareSync(contrasena,user.contrasena)){
      throw new UnauthorizedException(`Contraseña incorrecta`)
    }

    const {contrasena:_,...rest} = user.toJSON()

    return{
        user: rest,
        token: this.getJwtToken({id: user.id})
    }


  }

  getJwtToken(payload:JwtPayLoad){
    const token = this.jwtService.sign(payload)
    return token;
  }
  
}
