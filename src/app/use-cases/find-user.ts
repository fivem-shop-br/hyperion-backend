import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'src/utils/error.filter';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/users-repository';

interface findUserByIdRequest {
  id: string;
}

export interface findUserByIdResponse {
  user: User;
}

@Injectable()
export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: findUserByIdRequest): Promise<findUserByIdResponse> {
    const { id } = request;
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error({
        message: ['Usuario não encontrado.'],
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return {
      user,
    };
  }
}
