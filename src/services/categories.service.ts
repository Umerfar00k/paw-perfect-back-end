import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { CategoryModel } from '@models/categories.model';
import { Category } from '@/interfaces/categories.interface';

@Service()
export class CategoryService {
  public async findAllCategory(): Promise<Category[]> {
    const categories: Category[] = await CategoryModel.find();
    return categories;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    const findCategory: Category = await CategoryModel.findOne({ _id: categoryId });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    return findCategory;
  }

  public async createCategory(categoryData: Category): Promise<Category> {
    const findCategory: Category = await CategoryModel.findOne({ name: categoryData.name });
    if (findCategory) throw new HttpException(409, `This name ${categoryData.name} already exists`);

    const createCategoryData: Category = await CategoryModel.create({ ...categoryData });

    return createCategoryData;
  }

  public async updateCategory(categoryId: string, categoryData: Category): Promise<Category> {
    if (categoryData.name) {
      const findCategory: Category = await CategoryModel.findOne({ name: CategoryModel.name });
      if (findCategory && findCategory._id != categoryId) throw new HttpException(409, `This name ${categoryData.name} already exists`);
    }

    const updateProductById: Category = await CategoryModel.findByIdAndUpdate(categoryId, { name: categoryData.name });
    if (!updateProductById) throw new HttpException(409, "Category doesn't exist");

    return updateProductById;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deleteCategoryById: Category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!deleteCategoryById) throw new HttpException(409, "Category doesn't exist");

    return deleteCategoryById;
  }
}
