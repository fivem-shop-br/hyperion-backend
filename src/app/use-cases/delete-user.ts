import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'src/utils/error.filter';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/users-repository';

interface deleteUserByIdRequest {
  id: string;
}

export interface deleteUserByIdResponse {
  user: User;
}

@Injectable()
export class DeleteUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: deleteUserByIdRequest,
  ): Promise<deleteUserByIdResponse> {
    const { id } = request;
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new Error({
        error: { message: 'User not found' },
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return {
      user,
    };
  }
}
