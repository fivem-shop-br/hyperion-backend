import { HttpStatus, Injectable } from '@nestjs/common';
import { Shop } from 'src/app/entities/shop';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { Error } from 'src/utils/error.filter';

interface deleteShopRequest {
  slug: string;
}

export interface deleteShopResponse {
  shop: Shop;
}

@Injectable()
export class DeleteShop {
  constructor(private shopRepository: ShopRepository) {}

  async execute(request: deleteShopRequest): Promise<deleteShopResponse> {
    const { slug } = request;
    const shop = await this.shopRepository.delete(slug);

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
