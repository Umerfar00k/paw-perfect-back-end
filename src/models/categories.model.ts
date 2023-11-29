import { model, Schema, Document } from 'mongoose';
import { Category } from '@interfaces/categories.interface';

const CategorySchema: Schema = new Schema({
  parent_id: {
    type: String,
  },
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

export const CategoryModel = model<Category & Document>('Category', CategorySchema);
