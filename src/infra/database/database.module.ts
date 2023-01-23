import { Module } from '@nestjs/common';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { UserRepository } from '../../app/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaShopRepository } from './prisma/repositories/prisma-shop.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
    {
      provide: ShopRepository,
      useClass: PrismaShopRepository,
    },
  ],
  exports: [UserRepository, ShopRepository],
})
export class DatabaseModule {}
