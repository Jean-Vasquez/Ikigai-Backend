import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, isValidObjectId, Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
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

      const {offset = 0, sortOrder, sortField, categoria} = paginationDto;

      const sortDirection = sortOrder === 'asc' ? 1 : -1;

      let filter : FilterQuery<Producto> = {}
      if(categoria) filter.categoria = categoria
    
      const productos = await this.productoModel.find(filter)
      .limit(10)
      .skip(offset)
      .sort({[sortField]: sortDirection})
      .select('-__v -createdAt -updatedAt')

      const totalDocumentos = await this.productoModel.countDocuments(filter);
      
      return {
        productos,
        totalDocumentos
      }
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findProductsClient(paginationDto: PaginationDto) {
    try {

      const {offset = 0, sortOrder, sortField, categoria} = paginationDto;

      const sortDirection = sortOrder === 'asc' ? 1 : -1;

      let filter : FilterQuery<Producto> = {stock: {$gt: 0}}
      if(categoria) filter.categoria = categoria
    
      const productos = await this.productoModel.find(filter)
      .limit(15)
      .skip(offset)
      .sort({[sortField]: sortDirection})
      .select('_id nombre imagen categoria precio')

      const totalDocumentos = await this.productoModel.countDocuments(filter);
      
      return {
        productos,
        totalDocumentos
      }
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findNewProducts(paginationDto: PaginationDto) {
    try {

      const {offset = 0} = paginationDto;

      let filter : FilterQuery<Producto> = {stock: {$gt: 0}}
    
      const productos = await this.productoModel.find(filter)
      .sort({createdAt : -1})
      .limit(5)
      .skip(offset)
      .select('_id nombre imagen')
      
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
