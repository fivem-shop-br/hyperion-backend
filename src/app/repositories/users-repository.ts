import { User } from '../entities/user';
import type { User as UserPrisma } from '@prisma/client';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(userEmail: string): Promise<User>;
  abstract delete(userId: string): Promise<User>;
  abstract create(user: User): Promise<UserPrisma>;
}
