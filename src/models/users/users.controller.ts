import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import updateUser from './dtos/update.user';
import deleteUser from './dtos/delete-user';
import createUser from './dtos/create-user';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  create(@Body() data: createUser): Promise<User> {
    return this.usersService.create(data);
  }

  @Get('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch('user')
  update(@Body() data: updateUser): Promise<User> {
    return this.usersService.update(data);
  }

  @Delete('user')
  delete(@Body() data: deleteUser): Promise<User> {
    return this.usersService.delete(data);
  }
}
