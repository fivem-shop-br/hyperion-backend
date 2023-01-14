import { User } from '../entities/user';

export abstract class UserRepository {
  abstract findById(userId: string): Promise<User>;
}
