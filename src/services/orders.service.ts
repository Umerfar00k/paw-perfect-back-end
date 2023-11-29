import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { OrderModel } from '@models/orders.model';
import { Order } from '@/interfaces/orders.interface';

@Service()
export class OrderService {
  public async findAllOrder(): Promise<Order[]> {
    const categories: Order[] = await OrderModel.find();
    return categories;
  }

  public async findOrderById(orderId: string): Promise<Order> {
    const findOrder: Order = await OrderModel.findOne({ _id: orderId });
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    return findOrder;
  }

  public async createOrder(orderData: Order): Promise<Order> {
    const findCategory: Order = await OrderModel.findOne({ name: orderData.name });
    if (findCategory) throw new HttpException(409, `This name ${orderData.name} already exists`);

    const createOrderData: Order = await OrderModel.create({ ...orderData });

    return createOrderData;
  }

  public async updateOrder(orderId: string, orderData: Order): Promise<Order> {
    if (orderData.name) {
      const findOrder: Order = await OrderModel.findOne({ name: OrderModel.name });
      if (findOrder && findOrder._id != orderId) throw new HttpException(409, `This name ${orderData.name} already exists`);
    }

    const updateProductById: Order = await OrderModel.findByIdAndUpdate(orderId, { name: orderData.name });
    if (!updateProductById) throw new HttpException(409, "Category doesn't exist");

    return updateProductById;
  }

  public async deleteOrder(orderId: string): Promise<Order> {
    const deleteOrderById: Order = await OrderModel.findByIdAndDelete(orderId);
    if (!deleteOrderById) throw new HttpException(409, "Order doesn't exist");

    return deleteOrderById;
  }
}
