import { IsNotEmpty, IsEmail, Min } from 'class-validator';

export default class createUser {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Min(6)
  email: string;

  @IsNotEmpty()
  password: string;

  emailVerified?: boolean;

  image?: string;
}
