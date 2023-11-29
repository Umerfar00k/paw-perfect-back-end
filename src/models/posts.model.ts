import { model, Schema, Document } from 'mongoose';
import { Post } from '@interfaces/posts.interface';

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  des: {
    type: String,
    required: true,
  },
});

export const PostModel = model<Post & Document>('Post', PostSchema);
