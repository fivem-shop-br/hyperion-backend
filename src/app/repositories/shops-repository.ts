import { Shop } from '../entities/shop';

export abstract class ShopRepository {
  abstract findByUser(user: string): Promise<Shop[]>;
  abstract findById(userId: string, shopId: string): Promise<Shop>;
}
