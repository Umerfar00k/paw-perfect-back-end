import { model, Schema, Document } from 'mongoose';
import { Brand } from '@interfaces/brands.interface';

const BrandSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  des: {
    type: String,
    required: true,
  },
});

export const BrandModel = model<Brand & Document>('Brand', BrandSchema);
