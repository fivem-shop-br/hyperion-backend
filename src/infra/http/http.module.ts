import { FindAllUsers } from '@app/use-cases/find-users';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { FindUserById } from 'src/app/use-cases/find-user';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [FindUserById, FindAllUsers],
})
export class HttpModule {}
