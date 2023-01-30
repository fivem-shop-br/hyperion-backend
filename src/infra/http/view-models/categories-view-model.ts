import { Category } from 'src/app/entities/category';

export class CategoryViewModel {
  static toHTTP(category: Category) {
    return {
      id: category.id,
      shop_id: category.shop_id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
