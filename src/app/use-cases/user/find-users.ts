import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/users-repository';

export interface findAllUsersResponse {
  users: User[];
}

@Injectable()
export class FindAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<findAllUsersResponse> {
    const users = await this.userRepository.findAll();

    return {
      users,
    };
  }
}
