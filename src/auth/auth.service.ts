import * as bcrypt from 'bcrypt';
import { User } from '../app/entities/user';
import { UserRepository } from '../app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async signIn(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.userId,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email.toLowerCase());

    if (!user)
      throw new Error({
        message: 'Email não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) return new User(user);
    if (!isPasswordValid)
      throw new Error({
        message: 'E-mail ou senha inválidos.',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
  }
}
