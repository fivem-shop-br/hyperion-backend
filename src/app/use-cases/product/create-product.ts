import { Injectable, HttpStatus } from '@nestjs/common';
import type { Products as ProductPrisma } from '@prisma/client';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { Product } from 'src/app/entities/product';
import { CategoryRepository } from 'src/app/repositories/category-repository';
import { Error } from 'src/utils/error.filter';
import { ShopRepository } from 'src/app/repositories/shops-repository';

type CreateProductRequest = Product;
type CreateProductResponse = ProductPrisma;

@Injectable()
export class CreateProduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private shopRepository: ShopRepository,
  ) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { category_id } = request;
    const category = await this.categoryRepository.findById(category_id);

    if (!category)
      throw new Error({
        message: 'Categoria não encontrada.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    const allProductsPerCategory =
      await this.productRepository.findAllByCategoryId(category_id);

    const maxProducts = await this.shopRepository.maxProducts(
      category.shop_slug,
    );

    if (allProductsPerCategory.length >= maxProducts)
      throw new Error({
        message:
          'Você atingiu o maximo de produtos por categoria, atualize seu Plano.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.productRepository.create(request);
  }
}
