import { User } from '../../entities/user';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/users-repository';
import type { User as UserPrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

type UpdateUserRequest = User;
type UpdateUserResponse = UserPrisma;

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId: id } = request;
    const user = await this.userRepository.findById(id);

    if (!user)
      throw new Error({
        message: 'Usuario não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.userRepository.update(request);
  }
}
