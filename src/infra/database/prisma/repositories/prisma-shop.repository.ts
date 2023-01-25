import { Injectable } from '@nestjs/common';
import { Shop } from 'src/app/entities/shop';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { PrismaShopMapper } from '../mappers/prisma-shop-mappers';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(id: string): Promise<Shop[]> {
    const { shops } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        shops: true,
      },
    });

    if (!shops) return null;
    return shops.map(PrismaShopMapper.toDomain);
  }
}
