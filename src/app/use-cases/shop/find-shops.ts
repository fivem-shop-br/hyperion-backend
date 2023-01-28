import { Injectable } from '@nestjs/common';
import { Shop } from '../../entities/shop';
import { ShopRepository } from '../../repositories/shops-repository';

interface findShopsByUserRequest {
  user: string;
}

export interface findShopsByUserResponse {
  shop: Shop[];
}

@Injectable()
export class FindShopsByUser {
  constructor(private shopRepository: ShopRepository) {}

  async execute(
    request: findShopsByUserRequest,
  ): Promise<findShopsByUserResponse> {
    const { user } = request;
    const shop = await this.shopRepository.findByUser(user);

    return {
      shop,
    };
  }
}
