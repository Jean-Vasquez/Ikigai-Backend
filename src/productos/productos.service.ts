import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Persona } from 'src/persona/entities/persona.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ProductosService {

  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>
  ){}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = await this.productoModel.create(createProductoDto)
      return producto;
    } catch (error) {
        if(error.code === 11000){
          throw new BadRequestException(`Ya existe un producto con la misma imagen ${createProductoDto.imagen}`)
        }
        throw new InternalServerErrorException(`No se ha podido crear el producto`)
    }
  }

  async findAll() {
    try {
      const persona = await this.productoModel.find()
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(term: string) {
    
    let producto : Producto

    if(isValidObjectId(term)){
      producto = await this.productoModel.findById(term)
    }

    if(!producto){
      throw new NotFoundException(`No existe un producto con ese id: ${term}`)
    }

    return producto;
  }

  async update(term: string, updateProductoDto: UpdateProductoDto) {
    let producto : Producto
    
    producto = await this.findOne(term)
    
    try {
      await producto.updateOne(updateProductoDto)
      return {...producto.toJSON,...updateProductoDto}
    } catch (error) {

    }
    
  }

  async remove(_id:string) {
      const {deletedCount} = await this.productoModel.deleteOne({_id})

      if(deletedCount === 0){
        throw new BadRequestException(`El producto "${_id} no existe"`)
      }

      return this.findAll()
  }
}
