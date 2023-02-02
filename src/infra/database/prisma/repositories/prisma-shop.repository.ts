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

  async findByUserId(id: string, slug: string): Promise<Shop> {
    const { shops: shop } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        shops: {
          where: {
            slug,
          },
        },
      },
    });

    if (!shop.length) return null;
    return PrismaShopMapper.toDomain(shop[0]);
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
      plan: { max_categories },
    } = await this.prisma.shop.findFirst({
      where: {
        slug,
      },
      include: {
        plan: {
          select: { max_categories: true },
        },
      },
    });

    return max_categories;
  }

  async maxProducts(slug: string): Promise<number> {
    const {
      plan: { max_products },
    } = await this.prisma.shop.findFirst({
      where: {
        slug,
      },
      include: {
        plan: {
          select: { max_products: true },
        },
      },
    });

    return max_products;
  }
}
