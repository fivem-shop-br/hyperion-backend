import { FindShopsByOwner } from 'src/app/use-cases/find-shops';
import { Get, Controller } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ShopViewModel } from '../view-models/shop-view-model';

@Controller('shop')
export class ShopController {
  constructor(private findShopByOwner: FindShopsByOwner) {}

  @Get()
  async getShops(@CurrentUser() { id: owner }: User) {
    const { shop } = await this.findShopByOwner.execute({ owner });
    return shop.map(ShopViewModel.toHTTP);
  }
}
