import { Categories as RawCategory } from '@prisma/client';
import { Category } from 'src/app/entities/category';

export class PrismaCategoryMapper {
  static toDomain(raw: RawCategory): Category {
    return new Category(
      {
        id: raw.id,
        name: raw.name,
        shop_id: raw.shop_id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(category: Category) {
    return {
      id: category.categoryId,
      name: category.name,
      shop_id: category.shop_id,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
