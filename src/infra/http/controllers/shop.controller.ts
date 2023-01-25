import { FindShopsByUser } from 'src/app/use-cases/find-shops';
import { Get, Controller } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';

@Controller('shop')
export class ShopController {
  constructor(private findShopByUser: FindShopsByUser) {}

  @Get()
  async getShops(@CurrentUser() { id: user }: User) {
    const { shop } = await this.findShopByUser.execute({ user });
    return shop.map(ShopViewModel.toHTTP);
  }
}
