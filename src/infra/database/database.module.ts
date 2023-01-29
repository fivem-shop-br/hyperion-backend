import { Module } from '@nestjs/common';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { UserRepository } from '../../app/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategorieRepository } from './prisma/repositories/prisma-categorie-repository';
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
      provide: CategorieRepository,
      useClass: PrismaCategorieRepository,
    },
  ],
  exports: [UserRepository, ShopRepository, CategorieRepository],
})
export class DatabaseModule {}
