import { User } from '../entities/user';

export abstract class UserRepository {
  abstract findById(userId: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract delete(userId: string): Promise<User>;
}
