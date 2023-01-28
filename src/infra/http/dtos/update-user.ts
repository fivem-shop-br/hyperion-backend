import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class updateUser {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'email não pode ser vazio.' })
  @IsEmail({}, { message: 'email precisa ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'password não pode ser vazio.' })
  @MinLength(6, { message: 'password necessita de 6 characters.' })
  password: string;

  @IsBoolean({ message: 'emailVerified é um valor boleano' })
  emailVerified?: boolean;
  image?: string;
}
