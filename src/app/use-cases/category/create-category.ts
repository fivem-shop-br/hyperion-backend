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
    const { name, shopSlug } = request;
    const existShopId = await this.shopRepository.findBySlug(shopSlug);

    if (!existShopId)
      throw new Error({
        message: 'Essa shopSlug não existe.',
        statusCode: HttpStatus.CONFLICT,
      });

    const existName = await this.categoryRepository.findByName(name, shopSlug);

    if (existName)
      throw new Error({
        message: 'Essa categoria já foi cadastrada.',
        statusCode: HttpStatus.CONFLICT,
      });

    const maxCategories = await this.shopRepository.maxCategories(shopSlug);
    const allCategories = await this.categoryRepository.findAllBySlug(shopSlug);

    if (allCategories.length >= maxCategories)
      throw new Error({
        message: 'Você atingiu o maximo de categorias, atualize seu Plano.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.categoryRepository.create(request);
  }
}
