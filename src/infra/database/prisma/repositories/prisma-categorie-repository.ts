import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';
import { PrismaCategorieMapper } from '../mappers/prisma-categorie-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategorieRepository implements CategorieRepository {
  constructor(private prisma: PrismaService) {}
  async findAllBySlug(shop_slug: string): Promise<Categorie[]> {
    const categories = await this.prisma.categories.findMany({
      where: {
        shop_slug,
      },
    });
    return categories.map(PrismaCategorieMapper.toDomain);
  }

  async findByName(name: string, shop_slug: string): Promise<Categorie> {
    const categorie = await this.prisma.categories.findFirst({
      where: {
        name,
        shop_slug,
      },
    });

    if (!categorie) return null;
    return PrismaCategorieMapper.toDomain(categorie);
  }

  async create(categorie: Categorie): Promise<Categories> {
    const raw = PrismaCategorieMapper.toPrisma(categorie);

    return await this.prisma.categories.create({
      data: raw,
    });
  }

  async update(categorie: Categorie): Promise<Categories> {
    const { id, ...rest } = PrismaCategorieMapper.toPrisma(categorie);

    return await this.prisma.categories.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async delete(id: string): Promise<Categorie> {
    const categorie = await this.findById(id);
    if (!categorie) return null;
    const deleted = await this.prisma.categories.delete({
      where: {
        id,
      },
    });

    return PrismaCategorieMapper.toDomain(deleted);
  }

  async findById(id: string): Promise<Categorie> {
    const categorie = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    if (!categorie) return null;
    return PrismaCategorieMapper.toDomain(categorie);
  }

  async findBySlug(shop_slug: string): Promise<Categorie> {
    const categorie = await this.prisma.categories.findFirst({
      where: {
        shop_slug,
      },
    });

    if (!categorie) return null;
    return PrismaCategorieMapper.toDomain(categorie);
  }
}
