import { User } from '../entities/user';
import type { User as UserPrisma } from '@prisma/client';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(userEmail: string): Promise<UserPrisma | null>;
  abstract delete(userId: string): Promise<User>;
  abstract create(user: User): Promise<UserPrisma>;
  abstract update(user: User): Promise<UserPrisma>;
}
