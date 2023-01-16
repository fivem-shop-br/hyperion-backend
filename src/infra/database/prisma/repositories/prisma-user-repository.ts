import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/users-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(PrismaUserMapper.toDomain);
  }

  async delete(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) return null;
    const deleted = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return PrismaUserMapper.toDomain(deleted);
  }
}
