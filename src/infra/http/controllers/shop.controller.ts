import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { Get, Controller, Request } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
import { FindShopBySlug } from 'src/app/use-cases/shop/find-shop';

interface findByIdProps {
  user: UserFromJwt;
  params: {
    slug: string;
  };
}

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

  @Get('shop/:slug')
  async findById(
    @Request()
    { user: { id: userId }, params: { slug: shopSlug } }: findByIdProps,
  ) {
    const { shop } = await this.findShopBySlug.execute({ userId, shopSlug });
    return ShopViewModel.toHTTP(shop);
  }
}
