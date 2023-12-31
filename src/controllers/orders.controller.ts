import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Order } from '@interfaces/orders.interface';
import { OrderService } from '@services/orders.service';

export class OrderController {
  public order = Container.get(OrderService);

  public getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrdersData: Order[] = await this.order.findAllOrder();

      res.status(200).json({ data: findAllOrdersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const findOneOrderData: Order = await this.order.findOrderById(orderId);

      res.status(200).json({ data: findOneOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData: Order = req.body;
      const createOrderData: Order = await this.order.createOrder(orderData);

      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const orderData: Order = req.body;
      const updateOrderData: Order = await this.order.updateOrder(orderId, orderData);

      res.status(200).json({ data: updateOrderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const deleteOrderData: Order = await this.order.deleteOrder(orderId);

      res.status(200).json({ data: deleteOrderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
