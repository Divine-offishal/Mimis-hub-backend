import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('productImage'))
  @UsePipes(new ValidationPipe())
  async createProduct(
    @UploadedFile() file: Express.MulterFile,
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const imageUrl = await this.cloudinaryService.uploadFile(file);

    const productData = {
      ...createProductDto,
      productImage: imageUrl,
    };

    const product = await this.productsService.createProduct(productData);

    return product;
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }
}
