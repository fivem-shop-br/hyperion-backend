import { User as RawUsers } from '@prisma/client';
import { User } from 'src/app/entities/user';

export class PrismaUserMapper {
  static toDomain(raw: RawUsers): User {
    return new User(
      {
        id: raw.id,
        email: raw.email,
        name: raw.name,
        password: raw.password,
        emailVerified: raw.emailVerified,
        image: raw.image,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.userId,
      email: user.email,
      name: user.name,
      password: user.password,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
