import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  emailVerified?: boolean;
  image?: string;
}
