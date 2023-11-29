import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { CategoryController } from '@/controllers/categories.controller';

export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.category.getCategories);
    this.router.get(`${this.path}/:id`, this.category.getCategoryById);
    this.router.post(`${this.path}`, this.category.createCategory);
    this.router.put(`${this.path}/:id`, this.category.updateCategory);
    this.router.delete(`${this.path}/:id`, this.category.deleteCategory);
  }
}
