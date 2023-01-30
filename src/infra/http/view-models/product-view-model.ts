import { Product } from 'src/app/entities/product';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      image: product.image,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
