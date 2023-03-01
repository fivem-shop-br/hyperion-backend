import { Injectable } from '@nestjs/common';
import type { Products as productPrisma } from '@prisma/client';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { Product } from 'src/app/entities/product';

type UpdateProductRequest = Product;
type UpdateProductResponse = productPrisma;

@Injectable()
export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { productId } = request;
    const product = await this.productRepository.findById(productId);

    if (!product)
      throw new Error({
        message: 'Produto não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.productRepository.update(request);
  }
}
