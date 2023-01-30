import { Injectable } from '@nestjs/common';
import type { Categories as CategoryPrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { CategoryRepository } from 'src/app/repositories/category-repository';
import { Category } from 'src/app/entities/category';
import { ShopRepository } from 'src/app/repositories/shops-repository';

type CreateCategoryRequest = Category;
type CreateCategoryResponse = CategoryPrisma;

@Injectable()
export class CreateCategory {
  constructor(
    private categoryRepository: CategoryRepository,
    private shopRepository: ShopRepository,
  ) {}

  async execute(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const { name, shop_id } = request;
    const existShopId = await this.shopRepository.findById(shop_id);

    if (!existShopId)
      throw new Error({
        message: 'Essa shop_id não existe.',
        statusCode: HttpStatus.CONFLICT,
      });

    const existName = await this.categoryRepository.findByName(name, shop_id);

    if (existName)
      throw new Error({
        message: 'Essa categoria já foi cadastrada.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.categoryRepository.create(request);
  }
}
