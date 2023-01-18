import { User } from '@app/entities/user';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users-repository';
import type { User as UserPrisma } from '@prisma/client';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

type CreateUserRequest = User;
type CreateUserResponse = UserPrisma;

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email } = request;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new Error({
        message: 'Esse email já foi cadastrado.',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    return await this.userRepository.create(request);
  }
}
