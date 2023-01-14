import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import {
  FindUserById,
  findUserByIdResponse,
} from 'src/app/use-cases/find-user';
import { UserViewModel } from '../view-models/user-view-model';

@Controller()
export class UsersController {
  constructor(private findUserById: FindUserById) {}

  /* @Post('user')
  create(@Body() data: createUser) {
    return this.usersService.create(data);
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  } */

  @Get('user/:id')
  async findById(@Param('id') id: string) {
    const { user } = await this.findUserById.execute({ id });

    return {
      user: UserViewModel.toHTTP(user),
    };
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
