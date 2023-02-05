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
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
