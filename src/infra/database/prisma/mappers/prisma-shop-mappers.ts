import { Shop as RawShop } from '@prisma/client';
import { Shop } from 'src/app/entities/shop';

export class PrismaShopMapper {
  static toDomain(raw: RawShop): Shop {
    return new Shop(
      {
        id: raw.id,
        name: raw.name,
        domain: raw.domain,
        planType: raw.planType,
        slug: raw.slug,
        banner: raw.banner,
        description: raw.description,
        favicon: raw.favicon,
        logo: raw.logo,
        primaryColor: raw.primaryColor,
        secondaryColor: raw.secondaryColor,
        expiredAt: raw.expiredAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(shop: Shop) {
    return {
      id: shop.id,
      name: shop.name,
      domain: shop.domain,
      planType: shop.planType,
      slug: shop.slug,
      banner: shop.banner,
      description: shop.description,
      favicon: shop.favicon,
      logo: shop.logo,
      primaryColor: shop.primaryColor,
      secondaryColor: shop.secondaryColor,
      expiredAt: shop.expiredAt,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
  }
}
