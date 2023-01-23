import { Injectable } from '@nestjs/common';
import { Shop } from '../entities/shop';
import { ShopRepository } from '../repositories/shops-repository';

interface findShopsByOwnerRequest {
  owner: string;
}

export interface findShopsByOwnerResponse {
  shop: Shop[];
}

@Injectable()
export class FindShopsByOwner {
  constructor(private shopRepository: ShopRepository) {}

  async execute(
    request: findShopsByOwnerRequest,
  ): Promise<findShopsByOwnerResponse> {
    const { owner } = request;
    const shop = await this.shopRepository.findByOwner(owner);

    return {
      shop,
    };
  }
}
