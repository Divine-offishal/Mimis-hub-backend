import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
// import { Transform } from 'class-transformer';
import { Product } from 'src/schemas/Cart.schema';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsArray()
  products: Product[];
}
