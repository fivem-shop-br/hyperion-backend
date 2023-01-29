import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'email não pode ser vazio.' })
  @IsEmail({}, { message: 'email precisa ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'password não pode ser vazia.' })
  @MinLength(6, { message: 'password necessita de 6 characters.' })
  password: string;

  emailVerified?: boolean;
  image?: string;
}
