import { Shop } from '../entities/shop';

export abstract class ShopRepository {
  abstract findByOwner(owner: string): Promise<Shop[]>;
}
