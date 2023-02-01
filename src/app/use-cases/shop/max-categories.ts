import { Injectable, HttpStatus } from '@nestjs/common';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { Error } from 'src/utils/error.filter';

@Injectable()
export class maxCategories {
  constructor(private shopRepository: ShopRepository) {}

  async execute(shop_slug: string): Promise<number> {
    const product = await this.shopRepository.findBySlug(shop_slug);

    if (!product)
      throw new Error({
        message: 'Shop não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.shopRepository.maxCategories(shop_slug);
  }
}
