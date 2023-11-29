import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';

@Service()
export class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = await ProductModel.find();
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "User doesn't exist");

    return findProduct;
  }

  public async createProduct(productData: Product): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ name: productData.name });
    if (findProduct) throw new HttpException(409, `This name ${productData.name} already exists`);

    const createUserData: Product = await ProductModel.create({ ...productData });

    return createUserData;
  }

  public async updateProduct(productId: string, productData: Product): Promise<Product> {
    if (productData.name) {
      const findProduct: Product = await ProductModel.findOne({ name: productData.name });
      if (findProduct && findProduct._id != productId) throw new HttpException(409, `This name ${productData.name} already exists`);
    }

    const updateProductById: Product = await ProductModel.findByIdAndUpdate(productId, { email: productData.name });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await ProductModel.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "User doesn't exist");

    return deleteProductById;
  }
}
