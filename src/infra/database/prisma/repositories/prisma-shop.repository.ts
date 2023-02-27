import { Injectable } from '@nestjs/common';
import { Shop } from 'src/app/entities/shop';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { PrismaShopMapper } from '../mappers/prisma-shop-mappers';
import { PrismaService } from '../prisma.service';
import type { Shop as Shops, UserInShopRoles } from '@prisma/client';
@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string): Promise<Shop[]> {
    const shops = await this.prisma.userInShop.findMany({
      where: {
        userId,
      },
      include: {
        shop: true,
      },
    });

    return shops.map(({ shop }) => PrismaShopMapper.toDomain(shop));
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

  async allRolesByUserId(
    userId: string,
    shopId: string,
  ): Promise<UserInShopRoles[]> {
    const { role } = await this.prisma.userInShop.findFirst({
      where: {
        userId,
        shopId,
      },
      select: {
        role: true,
      },
    });

    return role;
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

  async update(shop: Shop): Promise<Shops> {
    const { slug, ...rest } = PrismaShopMapper.toPrisma(shop);

    return await this.prisma.shop.update({
      where: {
        slug,
      },
      data: rest,
    });
  }

  async delete(slug: string): Promise<Shop> {
    const shop = await this.findBySlug(slug);
    if (!shop) return null;
    const deleted = await this.prisma.shop.delete({
      where: {
        slug,
      },
    });

    return PrismaShopMapper.toDomain(deleted);
  }
}
