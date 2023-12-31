import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { OrderController } from '@/controllers/orders.controller';

export class OrderRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.order.getOrders);
    this.router.get(`${this.path}/:id`, this.order.getOrderById);
    this.router.post(`${this.path}`, this.order.createOrder);
    this.router.put(`${this.path}/:id`, this.order.updateOrder);
    this.router.delete(`${this.path}/:id`, this.order.deleteOrder);
  }
}
