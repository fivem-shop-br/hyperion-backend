import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'src/utils/error.filter';
import { Shop } from '../../entities/shop';
import { ShopRepository } from '../../repositories/shops-repository';

interface findShopByIdRequest {
  userId: string;
  shopId: string;
}

export interface findShopByIdResponse {
  shop: Shop;
}

@Injectable()
export class FindShopById {
  constructor(private shopRepository: ShopRepository) {}

  async execute(request: findShopByIdRequest): Promise<findShopByIdResponse> {
    const { shopId, userId } = request;
    const shop = await this.shopRepository.findById(userId, shopId);

    if (!shop)
      throw new Error({
        message: 'Shop não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      shop,
    };
  }
}
