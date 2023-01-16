import { IsNotEmpty, IsEmail } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  emailVerified?: boolean;

  image?: string;
}
