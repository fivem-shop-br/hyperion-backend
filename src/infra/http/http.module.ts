import { CreateUser } from '../../app/use-cases/user/create-user';
import { DeleteUserById } from '../../app/use-cases/user/delete-user';
import { FindAllUsers } from '../../app/use-cases/user/find-users';
import { UpdateUser } from '../../app/use-cases/user/update-user';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FindUserById } from '../../app/use-cases/user/find-user';
import { UsersController } from './controllers/users.controller';
import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { ShopController } from './controllers/shop.controller';
import { FindShopById } from 'src/app/use-cases/shop/find-shop';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, ShopController],
  providers: [
    FindUserById,
    FindAllUsers,
    DeleteUserById,
    CreateUser,
    UpdateUser,
    FindShopsByUser,
    FindShopById,
  ],
})
export class HttpModule {}
