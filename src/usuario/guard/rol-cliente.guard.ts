import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService} from '@nestjs/jwt';



import { Request } from 'express';
import { UsuarioService } from '../usuario.service';

@Injectable()
export class RolClienteGuard implements CanActivate {
  constructor(  private jwtService: JwtService){}
  
  //metodo para validar rutas
   async canActivate(context: ExecutionContext,) {

    //obtener el request de la peticcion
    const request = context.switchToHttp().getRequest()

    //validacion si hay token
    const token = this.extractToken(request)
    if(!token)
      throw new UnauthorizedException();

    try {
      //verificar si tiene la firma
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SEED
        }
      )

      //verificar si existe e payload
      if(!payload)
        throw new UnauthorizedException();

      //verificar si el rol es cliente
      if(payload.rol !== 'cliente')
        throw new UnauthorizedException();

    

      return true;
    } catch (error) {
      throw new UnauthorizedException()
    }
  }


  //Extarccion del token
  private extractToken(request: Request){
    const [type, token] = request.headers.authorization?.split(' ')??[]
    return type === 'Bearer' ? token : undefined
  }


}
