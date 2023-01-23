import { Shop } from 'src/app/entities/shop';

export class ShopViewModel {
  static toHTTP(shop: Shop) {
    return {
      id: shop.id,
      name: shop.name,
      domain: shop.domain,
      owner_id: shop.owner_id,
      plan: shop.plan,
      slug: shop.slug,
      banner: shop.banner,
      description: shop.description,
      favicon: shop.favicon,
      logo: shop.logo,
      primary_color: shop.primary_color,
      secondary_color: shop.secondary_color,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
  }
}
