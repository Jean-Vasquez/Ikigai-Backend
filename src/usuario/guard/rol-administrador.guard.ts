import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService} from '@nestjs/jwt';

import { Request } from 'express';
import { JwtPayLoad } from '../interfaces/JWT.interface';

@Injectable()
export class RolAdministradorGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  
  //metodo que se ejecuta antes de la peticion al servicio
   async canActivate(context: ExecutionContext,) {

    //obtener el request de la peticcion
    const request = context.switchToHttp().getRequest()

    //validacion si hay token
    const token = this.extractToken(request)
    if(!token)
      throw new UnauthorizedException('No hay token en la petición');

    try {
      //verificar si tiene la firma
      const payload = await this.jwtService.verifyAsync<JwtPayLoad>(
        token,
        {
          secret: process.env.JWT_SEED
        }
      )

      //verificar si existe e payload
      if(!payload)
        throw new UnauthorizedException('No hay token en la petición');

      //verificar si el rol es administrador
      if(payload.rol !== 'administrador')
        throw new UnauthorizedException('Necesitas ser administrador');

      request['user'] = payload.id

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
