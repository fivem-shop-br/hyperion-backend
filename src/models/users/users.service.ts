import createUser from './dtos/create-user';
import updateUser from './dtos/update.user';
import deleteUser from './dtos/delete-user';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: createUser): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update({ id, ...rest }: updateUser): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...rest },
    });
  }

  async delete({ id }: deleteUser): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
