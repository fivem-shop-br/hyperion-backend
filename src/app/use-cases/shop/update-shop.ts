import { Injectable } from '@nestjs/common';
import type { Shop as shopPrisma } from '@prisma/client';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { Shop } from 'src/app/entities/shop';
import { ShopRepository } from 'src/app/repositories/shops-repository';

type UpdateShopRequest = Shop;
type UpdateShopResponse = shopPrisma;

@Injectable()
export class UpdateShop {
  constructor(private shopRepository: ShopRepository) {}

  async execute(request: UpdateShopRequest): Promise<UpdateShopResponse> {
    const { slug } = request;
    const shop = await this.shopRepository.findBySlug(slug);

    if (!shop)
      throw new Error({
        message: 'Shop não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.shopRepository.update(request);
  }
}
