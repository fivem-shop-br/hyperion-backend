import { DeleteUserById } from '@app/use-cases/delete-user';
import { FindAllUsers } from '@app/use-cases/find-users';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import deleteUser from '../dtos/delete-user';
import { FindUserById } from 'src/app/use-cases/find-user';
import { UserViewModel } from '../view-models/user-view-model';
import createUser from '../dtos/create-user';
import { CreateUser as CreateUserU } from '@app/use-cases/create-user';
import { User } from '@app/entities/user';

@Controller()
export class UsersController {
  constructor(
    private findUserById: FindUserById,
    private findAllUsers: FindAllUsers,
    private deleteUserById: DeleteUserById,
    private createUser: CreateUserU,
  ) {}

  @Post('user')
  async create(@Body() data: createUser) {
    const user = new User(data);
    return await this.createUser.execute(user);
  }

  @Get('users')
  async findAll() {
    const { users } = await this.findAllUsers.execute();
    return {
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @Get('user/:id')
  async findById(@Param('id') id: string) {
    const { user } = await this.findUserById.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  /* @Patch('user')
  update(@Body() data: updateUser) {
    return this.usersService.update(data);
  } */

  @Delete('user')
  async delete(@Body() { id }: deleteUser) {
    const { user } = await this.deleteUserById.execute({ id });
    return UserViewModel.toHTTP(user);
  }
}
