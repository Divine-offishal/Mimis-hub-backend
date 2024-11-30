import { Controller, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';

@Controller('api/v1/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post(':id')
  createCart(@Param('id') id: string, createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto, id);
  }
}
