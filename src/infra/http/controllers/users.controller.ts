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
import { FindUserById } from 'src/app/use-cases/find-user';
import { UserViewModel } from '../view-models/user-view-model';

@Controller()
export class UsersController {
  constructor(
    private findUserById: FindUserById,
    private findAllUsers: FindAllUsers,
  ) {}

  /* @Post('user')
  create(@Body() data: createUser) {
    return this.usersService.create(data);
  } */

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
  }

  @Delete('user')
  delete(@Body() data: deleteUser) {
    return this.usersService.delete(data);
  } */
}
