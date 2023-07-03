import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from '../../../utils/error.filter';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/users-repository';
import { ShopRepository } from 'src/app/repositories/shops-repository';

interface deleteUserByIdRequest {
  id: string;
}

export interface deleteUserByIdResponse {
  user: User;
}

@Injectable()
export class DeleteUserById {
  constructor(
    private userRepository: UserRepository,
    private shopRepository: ShopRepository,
  ) {}

  async execute(
    request: deleteUserByIdRequest,
  ): Promise<deleteUserByIdResponse> {
    const { id } = request;
    const shops = await this.shopRepository.findByUser(id);

    if (shops.length) {
      throw new Error({
        message: 'Voce tem um shop.',
        statusCode: HttpStatus.CONFLICT,
      });
    }
    
    const user = await this.userRepository.delete(id);

    if (!user)
      throw new Error({
        message: 'Usuario não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      user,
    };
  }
}
