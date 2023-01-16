import { User } from '@app/entities/user';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users-repository';
import type { User as UserPrisma } from '@prisma/client';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

type UpdateUserRequest = User;
type UpdateUserResponse = UserPrisma;

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId: id } = request;
    const user = await this.userRepository.findById(id);

    console.log(id);

    if (!user) {
      throw new Error({
        message: ['User not found'],
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return await this.userRepository.update(request);
  }
}
