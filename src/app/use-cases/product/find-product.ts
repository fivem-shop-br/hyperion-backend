import { HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'src/app/entities/product';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { Error } from 'src/utils/error.filter';

@Injectable()
export class FindProductById {
  constructor(private ProductsRepository: ProductRepository) {}

  async execute(product_id: string): Promise<Product> {
    const product = await this.ProductsRepository.findById(product_id);

    if (!product)
      throw new Error({
        message: 'Produto não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return product;
  }
}
