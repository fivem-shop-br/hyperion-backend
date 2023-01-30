import { Module } from '@nestjs/common';
import { CategoryRepository } from 'src/app/repositories/category-repository';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { UserRepository } from '../../app/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { PrismaShopRepository } from './prisma/repositories/prisma-shop.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ShopRepository,
      useClass: PrismaShopRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [UserRepository, ShopRepository, CategoryRepository],
})
export class DatabaseModule {}
