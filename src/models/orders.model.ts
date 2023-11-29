import { model, Schema, Document } from 'mongoose';
import { Order } from '@interfaces/orders.interface';

const OrderSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const OrderModel = model<Order & Document>('Order', OrderSchema);
