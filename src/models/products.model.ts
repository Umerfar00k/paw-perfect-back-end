import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dPrice: {
    type: Number,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const ProductModel = model<Product & Document>('Product', ProductSchema);
