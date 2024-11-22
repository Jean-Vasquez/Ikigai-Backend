import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService} from '@nestjs/jwt';



import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  
   async canActivate(context: ExecutionContext,) {

    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    try {
     await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SEED
        }
      )
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true 
  }

  private extractToken(request: Request){
    const [type, token] = request.headers.authorization?.split(' ')??[]
    return type === 'Bearer' ? token : undefined
  }


}
