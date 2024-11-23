import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsNumber()
  @IsNotEmpty()
  productQuantity: number;

  @IsString()
  @IsNotEmpty()
  productImage: string;

  @IsString()
  @IsNotEmpty()
  productCategory: string;

  @IsNumber()
  @IsNotEmpty()
  productRating: number;

  @IsNumber()
  @IsNotEmpty()
  productReviews: number;

  @IsNumber()
  @IsNotEmpty()
  productStock: number;

  @IsBoolean()
  @IsNotEmpty()
  productStatus: boolean;
}
