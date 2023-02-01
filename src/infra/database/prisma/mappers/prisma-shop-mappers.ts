import { Shop as RawShop } from '@prisma/client';
import { Shop } from 'src/app/entities/shop';

export class PrismaShopMapper {
  static toDomain(raw: RawShop): Shop {
    return new Shop(
      {
        id: raw.id,
        name: raw.name,
        domain: raw.domain,
        plan_type: raw.plan_type,
        slug: raw.slug,
        banner: raw.banner,
        description: raw.description,
        favicon: raw.favicon,
        logo: raw.logo,
        primary_color: raw.primary_color,
        secondary_color: raw.secondary_color,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
