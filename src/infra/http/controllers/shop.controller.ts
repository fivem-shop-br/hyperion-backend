import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { Get, Controller, Patch, Body, Delete } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';
import { FindShopBySlug } from 'src/app/use-cases/shop/find-shop';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Param, Post } from '@nestjs/common/decorators';
import updateShop from '../dtos/update-shop';
import { UpdateShop } from 'src/app/use-cases/shop/update-shop';
import { Shop } from 'src/app/entities/shop';
import { shopRoles } from '../decorators/shop-roles.decorator';
import deleteShop from '../dtos/delete-shop';
import { DeleteShop } from 'src/app/use-cases/shop/delete-shop';
import { CreateShop } from 'src/app/use-cases/shop/create-shop';
import createShop from '../dtos/create-shop';

@Controller()
export class ShopController {
  constructor(
    private findShopByUser: FindShopsByUser,
    private findShopBySlug: FindShopBySlug,
    private createShop: CreateShop,
    private updateShop: UpdateShop,
    private deleteShop: DeleteShop,
  ) {}

  @Get('shops')
  async findAll(@CurrentUser() { id: user }: User) {
    const { shop } = await this.findShopByUser.execute({ user });
    return shop.map(ShopViewModel.toOwner);
  }

  @IsPublic()
  @Get('shop/:slug')
  async findById(
    @Param()
    { slug }: { slug: string },
  ) {
    const { shop } = await this.findShopBySlug.execute(slug);
    return ShopViewModel.toHTTP(shop);
  }

  @Post('shop')
  async create(@Body() data: createShop) {
    const category = new Shop(data);
    return await this.createShop.execute(category);
  }

  @Patch('shop')
  async update(@Body() data: updateShop) {
    const category = new Shop(data);
    return await this.updateShop.execute(category);
  }

  @shopRoles('owner')
  @Delete('product')
  async delete(@Body() { slug }: deleteShop) {
    const { shop } = await this.deleteShop.execute({ slug });
    return ShopViewModel.toHTTP(shop);
  }
}
