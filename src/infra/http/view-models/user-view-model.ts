import { User } from '../../../app/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
