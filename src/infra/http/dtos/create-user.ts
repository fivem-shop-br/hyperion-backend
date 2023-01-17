import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio.' })
  @IsEmail({}, { message: 'Email precisa ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'Password não pode ser vazia.' })
  @MinLength(6, { message: 'Password necessita de 6 characters.' })
  password: string;

  emailVerified?: boolean;
  image?: string;
}
