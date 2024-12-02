import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from '../schemas/Cart.schema';
import { CreateCartDto } from './dto/createCart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private CartModel: Model<Cart>) {}

  async createCart(createCartDto: CreateCartDto, userId) {
    if (!Types.ObjectId.isValid(userId)) throw new Error('Invalid user Id');
    //check if user has cart
    //If user doesn't, create cart
    //Else, return message that user already has a cart
    const userCart = await this.CartModel.findOne({ user: userId });

    if (userCart) throw new ConflictException('User already has a cart');

    const newCart = new this.CartModel({
      ...createCartDto,
      user: userId,
    });

    return await newCart.save();
  }
}
