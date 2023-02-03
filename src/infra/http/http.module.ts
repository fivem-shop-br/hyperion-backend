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
import { FindShopBySlug } from 'src/app/use-cases/shop/find-shop';
import { FindAllBySlugCategory } from 'src/app/use-cases/category/find-categories';
import { CreateCategory } from 'src/app/use-cases/category/create-category';
import { DeleteCategoryById } from 'src/app/use-cases/category/delete-category';
import { UpdateCategory } from 'src/app/use-cases/category/update-category';
import { CategorysController } from './controllers/categories.controller';
import { ProductController } from './controllers/product.controller';
import { FindAllProducts } from 'src/app/use-cases/product/find-products';
import { FindProductById } from 'src/app/use-cases/product/find-product';
import { CreateProduct } from 'src/app/use-cases/product/create-product';
import { DeleteProductById } from 'src/app/use-cases/product/delete-product';
import { FileController } from './controllers/file.controller';
import { FileUploadService } from 'src/utils/multer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    ShopController,
    CategorysController,
    ProductController,
    FileController,
  ],
  providers: [
    FindUserById,
    FindAllUsers,
    DeleteUserById,
    CreateUser,
    UpdateUser,
    FindShopsByUser,
    FindShopBySlug,
    FindAllBySlugCategory,
    CreateCategory,
    DeleteCategoryById,
    UpdateCategory,
    FindAllProducts,
    FindProductById,
    CreateProduct,
    DeleteProductById,
    FileUploadService,
  ],
})
export class HttpModule {}
