import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users-repository';

interface CreateUserRequest {}
interface CreateUserResponse {}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
}
