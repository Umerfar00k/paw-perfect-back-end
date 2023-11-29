import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { BrandModel } from '@models/brands.model';
import { Brand } from '@/interfaces/brands.interface';

@Service()
export class BrandService {
  public async findAllBrand(): Promise<Brand[]> {
    const categories: Brand[] = await BrandModel.find();
    return categories;
  }

  public async findBrandById(brandId: string): Promise<Brand> {
    const findBrand: Brand = await BrandModel.findOne({ _id: brandId });
    if (!findBrand) throw new HttpException(409, "Brand doesn't exist");

    return findBrand;
  }

  public async createBrand(brandData: Brand): Promise<Brand> {
    const findCategory: Brand = await BrandModel.findOne({ name: brandData.name });
    if (findCategory) throw new HttpException(409, `This name ${brandData.name} already exists`);

    const createBrandData: Brand = await BrandModel.create({ ...brandData });

    return createBrandData;
  }

  public async updateBrand(brandId: string, brandData: Brand): Promise<Brand> {
    if (brandData.name) {
      const findBrand: Brand = await BrandModel.findOne({ name: BrandModel.name });
      if (findBrand && findBrand._id != brandId) throw new HttpException(409, `This name ${brandData.name} already exists`);
    }

    const updateProductById: Brand = await BrandModel.findByIdAndUpdate(brandId, { name: brandData.name });
    if (!updateProductById) throw new HttpException(409, "Category doesn't exist");

    return updateProductById;
  }

  public async deleteBrand(brandId: string): Promise<Brand> {
    const deleteBrandById: Brand = await BrandModel.findByIdAndDelete(brandId);
    if (!deleteBrandById) throw new HttpException(409, "Brand doesn't exist");

    return deleteBrandById;
  }
}
