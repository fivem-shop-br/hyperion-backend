import { Injectable } from '@nestjs/common';
import { Product } from 'src/app/entities/product';
import { ProductRepository } from 'src/app/repositories/product-repository';

@Injectable()
export class FindAllProducts {
  constructor(private ProductsRepository: ProductRepository) {}

  async execute(categoryId: string): Promise<Product[]> {
    return await this.ProductsRepository.findAllByCategoryId(categoryId);
  }
}
