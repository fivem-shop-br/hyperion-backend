import { IsNotEmpty } from 'class-validator';

export default class createUser {
  @IsNotEmpty({ message: 'name is empty' })
  name: string;

  @IsNotEmpty({ message: 'email is empty' })
  email: string;

  @IsNotEmpty({ message: 'password is empty' })
  password: string;

  emailVerified?: boolean;

  image?: string;
}
