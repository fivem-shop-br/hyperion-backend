import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Body, Get, Param, Post, Delete } from '@nestjs/common';
import { FindAllProducts } from 'src/app/use-cases/product/find-products';
import { ProductViewModel } from '../view-models/product-view-model';
import { FindProductById } from 'src/app/use-cases/product/find-product';
import { CreateProduct } from 'src/app/use-cases/product/create-product';
import createProduct from '../dtos/create-product';
import { Product } from 'src/app/entities/product';
import { DeleteProductById } from 'src/app/use-cases/product/delete-product';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ForYouProcuts } from 'src/app/use-cases/product/for-you-products';

@Controller()
export class ProductController {
  constructor(
    private forYouProducts: ForYouProcuts,
    private findAllProducts: FindAllProducts,
    private findProductById: FindProductById,
    private createProduct: CreateProduct,
    private deleteProduct: DeleteProductById,
  ) {}

  @IsPublic()
  @Get('products-for-you/:shopSlug')
  async forYou(@Param() { shopSlug }: { shopSlug: string }) {
    const products = await this.forYouProducts.execute(shopSlug);
    return products.map(ProductViewModel.toHTTP);
  }

  @IsPublic()
  @Get('products/:category_id')
  async findAll(@Param() { category_id }: { category_id: string }) {
    const products = await this.findAllProducts.execute(category_id);
    return products.map(ProductViewModel.toHTTP);
  }

  @Get('product/:id')
  async findById(@Param() { id }: { id: string }) {
    const product = await this.findProductById.execute(id);
    return ProductViewModel.toHTTP(product);
  }

  @Post('product')
  async create(@Body() data: createProduct) {
    const product = new Product(data);
    return await this.createProduct.execute(product);
  }

  @Delete('product/:id')
  async delete(@Param() { id }: { id: string }) {
    const { product } = await this.deleteProduct.execute({ id });
    return ProductViewModel.toHTTP(product);
  }
}
