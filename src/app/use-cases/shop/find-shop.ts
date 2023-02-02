import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'src/utils/error.filter';
import { Shop } from '../../entities/shop';
import { ShopRepository } from '../../repositories/shops-repository';

export interface findShopByIdResponse {
  shop: Shop;
}

@Injectable()
export class FindShopBySlug {
  constructor(private shopRepository: ShopRepository) {}

  async execute(slug: string): Promise<findShopByIdResponse> {
    const shop = await this.shopRepository.findBySlug(slug);

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
