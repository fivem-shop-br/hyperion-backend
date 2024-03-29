import { UserInShopRoles, Shop as Shops } from '@prisma/client';
import { Shop } from '../entities/shop';

export abstract class ShopRepository {
  abstract findByUser(user: string): Promise<Shop[]>;
  abstract findBySlug(shopSlug: string): Promise<Shop>;
  abstract allRolesByUserId(
    userId: string,
    shopId: string,
  ): Promise<UserInShopRoles[]>;
  abstract maxCategories(shopSlug: string): Promise<number>;
  abstract maxProducts(shopSlug: string): Promise<number>;
  abstract create(shop: Shop): Promise<Shops>;
  abstract update(shop: Shop): Promise<Shops>;
  abstract delete(shopSlug: string): Promise<Shop>;
}
