import { Product } from '../entities/product';
import type { Products } from '@prisma/client';

export abstract class ProductRepository {
  abstract forYou(shopSlug: string);
  abstract findAllByCategoryId(categoryId: string): Promise<Product[]>;
  abstract findById(productId: string): Promise<Product>;
  abstract create(product: Product): Promise<Products>;
  abstract update(product: Product): Promise<Products>;
  abstract delete(productId: string): Promise<Product>;
}
