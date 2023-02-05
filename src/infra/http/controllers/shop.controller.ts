import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { Get, Controller } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';
import { FindShopBySlug } from 'src/app/use-cases/shop/find-shop';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Param } from '@nestjs/common/decorators';

@Controller()
export class ShopController {
  constructor(
    private findShopByUser: FindShopsByUser,
    private findShopBySlug: FindShopBySlug,
  ) {}

  @Get('shops')
  async findAll(@CurrentUser() { id: user }: User) {
    const { shop } = await this.findShopByUser.execute({ user });
    return shop.map(ShopViewModel.toHTTP);
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
}
