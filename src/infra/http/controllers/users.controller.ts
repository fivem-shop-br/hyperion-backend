import { DeleteUserById } from '../../../app/use-cases/user/delete-user';
import { FindAllUsers } from '../../../app/use-cases/user/find-users';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import deleteUser from '../dtos/delete-user';
import updateUser from '../dtos/update-user';
import createUser from '../dtos/create-user';
import { FindUserById } from '../../../app/use-cases/user/find-user';
import { UserViewModel } from '../view-models/user-view-model';
import { CreateUser as CreateUserU } from '../../../app/use-cases/user/create-user';
import { UpdateUser as updateUserU } from '../../../app/use-cases/user/update-user';
import { User } from '../../../app/entities/user';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/roles/role.enum';
import { IsPublic } from '../../../auth/decorators/is-public.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class UsersController {
  constructor(
    private findUserById: FindUserById,
    private findAllUsers: FindAllUsers,
    private deleteUserById: DeleteUserById,
    private createUser: CreateUserU,
    private updateUser: updateUserU,
  ) {}

  @Post('user')
  @IsPublic()
  @Throttle(5, 60 * 2)
  async create(@Body() data: createUser) {
    const user = new User(data);
    return await this.createUser.execute(user);
  }

  @Get('users')
  @Roles(Role.Admin)
  async findAll() {
    const { users } = await this.findAllUsers.execute();
    return {
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @Get('user/:id')
  @Roles(Role.Admin)
  async findById(@Param('id') id: string) {
    const { user } = await this.findUserById.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @Patch('user')
  @Roles(Role.Admin)
  update(@Body() data: updateUser) {
    const user = new User(data);
    return this.updateUser.execute(user);
  }

  @Delete('user')
  @Roles(Role.Admin)
  async delete(@Body() { id }: deleteUser) {
    const { user } = await this.deleteUserById.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @IsPublic()
  @Get('payment-test-in-production')
  async paymentTest(@Request() body: unknown) {
    console.log(body);
    return 'sucess';
  }
}
