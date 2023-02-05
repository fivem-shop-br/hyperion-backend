import { Injectable } from '@nestjs/common';
import { Product } from 'src/app/entities/product';
import { ProductRepository } from 'src/app/repositories/product-repository';

@Injectable()
export class ForYouProcuts {
  constructor(private productRepository: ProductRepository) {}

  async execute(shopSlug: string): Promise<Product[]> {
    return await this.productRepository.forYou(shopSlug);
  }
}
