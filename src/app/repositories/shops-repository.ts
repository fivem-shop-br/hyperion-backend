import { Shop } from '../entities/shop';

export abstract class ShopRepository {
  abstract findByUser(user: string): Promise<Shop[]>;
  abstract findByUserId(userId: string, shopId: string): Promise<Shop>;
  abstract findById(shopId: string): Promise<Shop>;
}
