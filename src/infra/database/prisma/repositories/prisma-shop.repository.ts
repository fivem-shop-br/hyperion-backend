import { Injectable } from '@nestjs/common';
import { Shop } from 'src/app/entities/shop';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { PrismaShopMapper } from '../mappers/prisma-shop-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(id: string): Promise<Shop[]> {
    const { shops, myShops } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        shops: true,
        myShops: true,
      },
    });

    if (!shops || !myShops) return null;
    const concatShops = shops.concat(myShops);
    return concatShops.map(PrismaShopMapper.toDomain);
  }

  async findByUserId(id: string, slug: string): Promise<Shop> {
    const { shops } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        shops: {
          where: {
            slug,
          },
        },
        myShops: true,
      },
    });

    if (!shops.length) return null;
    return PrismaShopMapper.toDomain(shops[0]);
  }

  async findBySlug(slug: string): Promise<Shop> {
    const shop = await this.prisma.shop.findFirst({
      where: {
        slug,
      },
    });

    if (!shop) return null;
    return PrismaShopMapper.toDomain(shop);
  }

  async maxCategories(slug: string): Promise<number> {
    const {
      plan: { maxCategories },
    } = await this.prisma.shop.findFirst({
      where: {
        slug,
      },
      include: {
        plan: {
          select: { maxCategories: true },
        },
      },
    });

    return maxCategories;
  }

  async maxProducts(slug: string): Promise<number> {
    const {
      plan: { maxProducts },
    } = await this.prisma.shop.findFirst({
      where: {
        slug,
      },
      include: {
        plan: {
          select: { maxProducts: true },
        },
      },
    });

    return maxProducts;
  }
}
