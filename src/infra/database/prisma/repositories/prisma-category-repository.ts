import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { Category } from 'src/app/entities/category';
import { CategoryRepository } from 'src/app/repositories/category-repository';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}
  async findAllById(shop_id: string): Promise<Category[]> {
    const categorys = await this.prisma.categories.findMany({
      where: {
        shop_id,
      },
    });
    return categorys.map(PrismaCategoryMapper.toDomain);
  }

  async findById(id: string): Promise<Category> {
    const categorys = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });
    if (!categorys) return null;
    return PrismaCategoryMapper.toDomain(categorys);
  }

  async findByName(name: string, shop_id: string): Promise<Category> {
    const category = await this.prisma.categories.findFirst({
      where: {
        name,
        shop_id,
      },
    });

    if (!category) return null;
    return PrismaCategoryMapper.toDomain(category);
  }

  async create(category: Category): Promise<Categories> {
    const raw = PrismaCategoryMapper.toPrisma(category);

    return await this.prisma.categories.create({
      data: raw,
    });
  }

  async update(category: Category): Promise<Categories> {
    const { id, ...rest } = PrismaCategoryMapper.toPrisma(category);

    return await this.prisma.categories.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async delete(id: string): Promise<Category> {
    const category = await this.findByCategoryId(id);

    if (!category) return null;
    const deleted = await this.prisma.categories.delete({
      where: {
        id,
      },
    });

    return PrismaCategoryMapper.toDomain(deleted);
  }

  async findByShopId(shop_id: string): Promise<Category> {
    const category = await this.prisma.categories.findFirst({
      where: {
        shop_id,
      },
    });

    if (!category) return null;
    return PrismaCategoryMapper.toDomain(category);
  }

  async findByCategoryId(id: string): Promise<Category> {
    const category = await this.prisma.categories.findFirst({
      where: {
        id,
      },
    });

    if (!category) return null;
    return PrismaCategoryMapper.toDomain(category);
  }
}
