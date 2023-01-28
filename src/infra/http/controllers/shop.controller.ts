import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { Get, Controller, Request } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
import { FindShopById } from 'src/app/use-cases/shop/find-shop';

interface findByIdProps {
  user: UserFromJwt;
  params: {
    id: string;
  };
}

@Controller()
export class ShopController {
  constructor(
    private findShopByUser: FindShopsByUser,
    private findShopById: FindShopById,
  ) {}

  @Get('shops')
  async findAll(@CurrentUser() { id: user }: User) {
    const { shop } = await this.findShopByUser.execute({ user });
    return shop.map(ShopViewModel.toHTTP);
  }

  @Get('shop/:id')
  async findById(
    @Request() { user: { id: userId }, params: { id: shopId } }: findByIdProps,
  ) {
    const { shop } = await this.findShopById.execute({ userId, shopId });
    return ShopViewModel.toHTTP(shop);
  }
}
