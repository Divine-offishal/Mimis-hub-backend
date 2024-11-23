import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  productImage: string;

  @Prop({ required: true })
  productCategory: string;

  @Prop({ required: true })
  productRating: number;

  @Prop({ required: true })
  productReviews: number;

  @Prop({ required: true })
  productStock: number;

  @Prop({ required: true })
  productStatus: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
