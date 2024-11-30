import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { loginDto } from './dto/login.dto';
import { RolAdministradorGuard } from './guard/rol-administrador.guard';
import { RolClienteGuard } from './guard/rol-cliente.guard';
import { RolTodosGuard } from './guard/rol-todos.guard';
import { Usuario } from './entities/usuario.entity';
import { loginResponse } from './interfaces/loginResponse.interrface'; 

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}


  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(RolTodosGuard)
  @Get()
  findOneById( @Request() req: Request) {
    const user =req['user']
    return user 
  }

  @UseGuards(RolTodosGuard)
  @Post('/login')
  login(@Body() dtoLogin : loginDto){
    return this.usuarioService.loginUser(dtoLogin)
  }
  
  @UseGuards(RolTodosGuard)
  @Get('/check-token')
  checkToken(@Request() req:Request): loginResponse{
 
    const user = req['user'] as Usuario
      
      return { 
        user: user,
        token: this.usuarioService.getJwtToken({id: user.id, rol: user.rol})
      }
   }


  @Patch(':term')
  update(@Param('term') term: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(term, updateUsuarioDto);
  }

}
