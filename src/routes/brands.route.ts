import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { BrandController } from '@/controllers/brands.controller';

export class BrandRoute implements Routes {
  public path = '/brands';
  public router = Router();
  public brand = new BrandController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.brand.getBrands);
    this.router.get(`${this.path}/:id`, this.brand.getBrandById);
    this.router.post(`${this.path}`, this.brand.createBrand);
    this.router.put(`${this.path}/:id`, this.brand.updateBrand);
    this.router.delete(`${this.path}/:id`, this.brand.deleteBrand);
  }
}
