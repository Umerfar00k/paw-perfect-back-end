import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Brand } from '@interfaces/brands.interface';
import { BrandService } from '@services/brands.service';

export class BrandController {
  public brand = Container.get(BrandService);

  public getBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBrandsData: Brand[] = await this.brand.findAllBrand();

      res.status(200).json({ data: findAllBrandsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBrandById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId: string = req.params.id;
      const findOneBrandData: Brand = await this.brand.findBrandById(brandId);

      res.status(200).json({ data: findOneBrandData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandData: Brand = req.body;
      const createBrandData: Brand = await this.brand.createBrand(brandData);

      res.status(201).json({ data: createBrandData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId: string = req.params.id;
      const brandData: Brand = req.body;
      const updateBrandData: Brand = await this.brand.updateBrand(brandId, brandData);

      res.status(200).json({ data: updateBrandData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId: string = req.params.id;
      const deleteBrandData: Brand = await this.brand.deleteBrand(brandId);

      res.status(200).json({ data: deleteBrandData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
