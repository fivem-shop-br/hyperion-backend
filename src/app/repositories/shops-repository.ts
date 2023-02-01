import { Shop } from '../entities/shop';

export abstract class ShopRepository {
  abstract findByUser(user: string): Promise<Shop[]>;
  abstract findByUserId(userId: string, shopSlug: string): Promise<Shop>;
  abstract findBySlug(shopSlug: string): Promise<Shop>;
  abstract maxCategories(shopSlug: string): Promise<number>;
  abstract maxProducts(shopSlug: string): Promise<number>;
}
