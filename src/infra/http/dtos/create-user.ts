import { IsNotEmpty, IsEmail, Min } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty({ message: 'name is empty' })
  name: string;

  @IsNotEmpty({ message: 'email is empty' })
  @IsEmail()
  @Min(6, { message: 'password is not 6 characters' })
  email: string;

  @IsNotEmpty({ message: 'password is empty' })
  password: string;

  emailVerified?: boolean;

  image?: string;
}
