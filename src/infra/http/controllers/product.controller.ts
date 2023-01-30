import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Body, Get, Param, Post } from '@nestjs/common';
import { FindAllProducts } from 'src/app/use-cases/product/find-products';
import { ProductViewModel } from '../view-models/product-view-model';
import { FindProductById } from 'src/app/use-cases/product/find-product';
import { CreateProduct } from 'src/app/use-cases/product/create-product';
import createProduct from '../dtos/create-product';
import { Product } from 'src/app/entities/product';

@Controller()
export class ProductController {
  constructor(
    private findAllProducts: FindAllProducts,
    private findProductById: FindProductById,
    private createProduct: CreateProduct,
  ) {}

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
}
