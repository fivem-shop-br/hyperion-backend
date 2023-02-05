import { Shop } from 'src/app/entities/shop';

export class ShopViewModel {
  static toHTTP(shop: Shop) {
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
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
  }
}
