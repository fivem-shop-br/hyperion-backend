import { CreateUser } from '@app/use-cases/create-user';
import { DeleteUserById } from '@app/use-cases/delete-user';
import { FindAllUsers } from '@app/use-cases/find-users';
import { UpdateUser } from '@app/use-cases/update-user';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FindUserById } from 'src/app/use-cases/find-user';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    FindUserById,
    FindAllUsers,
    DeleteUserById,
    CreateUser,
    UpdateUser,
  ],
})
export class HttpModule {}
