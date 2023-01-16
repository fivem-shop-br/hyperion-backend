import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class updateUser {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  emailVerified?: boolean;
  image?: string;
}
