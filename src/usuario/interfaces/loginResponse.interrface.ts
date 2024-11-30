import { Usuario } from "../entities/usuario.entity";

export interface loginResponse{
    user: Usuario,
    token: string
}