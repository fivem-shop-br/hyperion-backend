import { Category } from '../entities/category';
import type { Categories as CategoryPrisma } from '@prisma/client';

export abstract class CategoryRepository {
  abstract findAllBySlug(id: string): Promise<Category[]>;
  abstract findById(id: string): Promise<Category>;
  abstract findByName(name: string, id: string): Promise<Category>;
  abstract findByShopSlug(shopSlug: string): Promise<Category>;
  abstract findByCategoryId(categoryId: string): Promise<Category>;
  abstract create(category: Category): Promise<CategoryPrisma>;
  abstract update(category: Category): Promise<CategoryPrisma>;
  abstract delete(categoryId: string): Promise<Category>;
}
