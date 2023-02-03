import { Categories as RawCategory } from '@prisma/client';
import { Category } from 'src/app/entities/category';

export class PrismaCategoryMapper {
  static toDomain(raw: RawCategory): Category {
    return new Category(
      {
        id: raw.id,
        name: raw.name,
        shopSlug: raw.shopSlug,
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
      shopSlug: category.shopSlug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
