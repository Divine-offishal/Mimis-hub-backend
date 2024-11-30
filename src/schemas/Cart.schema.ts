import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Product } from './Product.schema';
import { User } from './User.schema';

export type Product = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  productReviews: number;
  productStock: number;
  productStatus: boolean;
};

@Schema()
export class Cart extends Document {
  @Prop()
  total: number;

  @Prop()
  items: Product[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
