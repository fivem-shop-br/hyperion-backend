import { Shop } from '../../entities/Shop';
import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../../repositories/shops-repository';
import type { Shop as ShopPrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

type CreateShopRequest = Shop;
type CreateShopResponse = ShopPrisma;

@Injectable()
export class CreateShop {
  constructor(private ShopRepository: ShopRepository) {}

  async execute(request: CreateShopRequest): Promise<CreateShopResponse> {
    const { slug } = request;
    const existShop = await this.ShopRepository.findBySlug(slug);

    if (existShop)
      throw new Error({
        message: 'Esse slug já foi cadastrado.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.ShopRepository.create(request);
  }
}
