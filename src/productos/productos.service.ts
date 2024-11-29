import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import e from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
    private commonService : CommonService
  ){}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = await this.productoModel.create(createProductoDto)
      return producto;
    } catch (error) {
       this.commonService.handleExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const {offset = 0, sortOrder, sortField} = paginationDto;

      const sortDirection = sortOrder === 'asc' ? 1 : -1;

      const productos = await this.productoModel.find()
      .limit(10)
      .skip(offset)
      .sort({[sortField]: sortDirection})
      .select('-__v')
      return productos
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findOne(term: string) {
    
    let producto : Producto

    if(isValidObjectId(term)){
      producto = await this.productoModel.findById(term)
    }
    if(!producto){
      producto = (await this.productoModel.findOne({nombre:term.trim()}))
    }
    if(!producto){
      throw new NotFoundException(`No existe un producto con id: ${term}`)
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
      this.commonService.handleExceptions(error)
    }
    
  }

  async remove(_id:string) {
      
    try{
      
      const productEliminado = await this.productoModel.findByIdAndDelete({_id})
      
      if(!productEliminado){
        throw new NotFoundException(`El producto con id ${_id} no existe`)
      }
      
      return productEliminado
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }
}
