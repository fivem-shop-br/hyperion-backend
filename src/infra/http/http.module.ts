import { CreateUser } from 'src/app/use-cases/user/create-user';
import { DeleteUserById } from 'src/app/use-cases/user/delete-user';
import { FindAllUsers } from 'src/app/use-cases/user/find-users';
import { UpdateUser } from 'src/app/use-cases/user/update-user';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FindUserById } from 'src/app/use-cases/user/find-user';
import { UsersController } from './controllers/users.controller';
import { FindShopsByUser } from 'src/app/use-cases/shop/find-shops';
import { ShopController } from './controllers/shop.controller';
import { FindShopById } from 'src/app/use-cases/shop/find-shop';
import { FindAllByIdCategory } from 'src/app/use-cases/category/find-categories';
import { CreateCategory } from 'src/app/use-cases/category/create-category';
import { DeleteCategoryById } from 'src/app/use-cases/category/delete-category';
import { UpdateCategory } from 'src/app/use-cases/category/update-category';
import { CategorysController } from './controllers/categories.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, ShopController, CategorysController],
  providers: [
    FindUserById,
    FindAllUsers,
    DeleteUserById,
    CreateUser,
    UpdateUser,
    FindShopsByUser,
    FindShopById,
    FindAllByIdCategory,
    CreateCategory,
    DeleteCategoryById,
    UpdateCategory,
  ],
})
export class HttpModule {}
