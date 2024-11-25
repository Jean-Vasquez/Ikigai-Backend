import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { loginDto } from './dto/login,dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('registro')
  async registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usuarioService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(term, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  @Post('/login')
  login(@Body() dtoLogin: loginDto) {
    return this.usuarioService.loginUser(dtoLogin);
  }
}
