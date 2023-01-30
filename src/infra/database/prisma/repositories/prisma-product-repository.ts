import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { Product } from 'src/app/entities/product';
import { ProductRepository } from 'src/app/repositories/product-repository';
import { PrismaProductMapper } from '../mappers/prisma-product-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}
  async findAllByCategoryId(category_id: string): Promise<Product[]> {
    const allByCategory = await this.prisma.products.findMany({
      where: {
        category_id,
      },
    });

    return allByCategory.map(PrismaProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product> {
    const findById = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!findById) return null;
    return PrismaProductMapper.toDomain(findById);
  }

  async create(product: Product): Promise<Products> {
    const raw = PrismaProductMapper.toPrisma(product);

    return await this.prisma.products.create({
      data: raw,
    });
  }

  async update(product: Product): Promise<Products> {
    const { id, ...rest } = PrismaProductMapper.toPrisma(product);

    return await this.prisma.products.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async delete(id: string): Promise<Products> {
    const deleted = await this.prisma.products.delete({
      where: {
        id,
      },
    });

    return PrismaProductMapper.toDomain(deleted);
  }
}
