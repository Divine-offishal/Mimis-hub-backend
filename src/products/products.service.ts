import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  createProduct(createProductDto: CreateProductDto) {
    const product = new this.ProductModel(createProductDto);

    return product.save();
  }

  async getAllProducts(): Promise<{
    data: Product[];
    success: boolean;
    statusCode: number;
  }> {
    try {
      const products = await this.ProductModel.find().exec();

      return {
        data: products,
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      console.error('Error fetching products:', error);

      throw new Error('Failed to fetch products. Please try again later.');
    }
  }

  async getProductById(id: string): Promise<{
    data: Product;
    success: boolean;
    statusCode: number;
  }> {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);

      if (!isValid) throw new NotFoundException();
      const product = await this.ProductModel.findById(id);
      if (!product) throw new NotFoundException();

      return {
        success: true,
        statusCode: 200,
        data: product,
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product. Please try again later.');
    }
  }
}
