import { CreateUser } from '../../app/use-cases/create-user';
import { DeleteUserById } from '../../app/use-cases/delete-user';
import { FindAllUsers } from '../../app/use-cases/find-users';
import { UpdateUser } from '../../app/use-cases/update-user';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FindUserById } from '../../app/use-cases/find-user';
import { UsersController } from './controllers/users.controller';
import { FindShopsByUser } from 'src/app/use-cases/find-shops';
import { ShopController } from './controllers/shop.controller';
import { FindShopById } from 'src/app/use-cases/find-shop';

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
