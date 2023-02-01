import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'src/utils/error.filter';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { Product } from 'src/app/entities/product';

interface deleteProductByIdRequest {
  id: string;
}

export interface deleteProductByIdResponse {
  product: Product;
}

@Injectable()
export class DeleteProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: deleteProductByIdRequest,
  ): Promise<deleteProductByIdResponse> {
    const { id } = request;
    const product = await this.productRepository.delete(id);

    if (!product)
      throw new Error({
        message: 'Produto não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      product,
    };
  }
}
