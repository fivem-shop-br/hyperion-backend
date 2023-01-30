import { Injectable, HttpStatus } from '@nestjs/common';
import type { Products as ProductPrisma } from '@prisma/client';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { Product } from 'src/app/entities/product';
import { CategoryRepository } from 'src/app/repositories/category-repository';
import { Error } from 'src/utils/error.filter';

type CreateProductRequest = Product;
type CreateProductResponse = ProductPrisma;

@Injectable()
export class CreateProduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { category_id } = request;
    console.log(category_id);
    const existCategory = await this.categoryRepository.findById(category_id);

    console.log(existCategory);

    if (!existCategory)
      throw new Error({
        message: 'Categoria não encontrada.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.productRepository.create(request);
  }
}
