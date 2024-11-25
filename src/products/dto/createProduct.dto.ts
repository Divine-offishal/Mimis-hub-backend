import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @Transform(({ value }) => parseFloat(value)) // Converts string to number
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @Transform(({ value }) => parseInt(value, 10)) // Converts string to integer
  @IsNumber()
  @IsNotEmpty()
  productQuantity: number;

  // @IsString() // Kept as string for the URL of the uploaded file
  // @IsNotEmpty()
  // productImage: string;

  @IsString()
  @IsNotEmpty()
  productCategory: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  productRating: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  productReviews: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  productStock: number;

  @Transform(({ value }) => value === 'true') // Converts "true"/"false" to boolean
  @IsBoolean()
  @IsNotEmpty()
  productStatus: boolean;
}
