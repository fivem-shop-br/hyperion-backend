import { Products as RawProduct } from '@prisma/client';
import { Product } from 'src/app/entities/product';

export class PrismaProductMapper {
  static toDomain(raw: RawProduct): Product {
    return new Product(
      {
        id: raw.id,
        category_id: raw.category_id,
        name: raw.name,
        image: raw.image,
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.productId,
      category_id: product.category_id,
      name: product.name,
      image: product.image,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
