import { IsBoolean, IsNotEmpty } from 'class-validator';

export default class updateUser {
  @IsNotEmpty({ message: 'id is empty' })
  id: string;

  @IsNotEmpty({ message: 'name is empty' })
  name: string;

  @IsNotEmpty({ message: 'email is empty' })
  email: string;

  @IsNotEmpty({ message: 'password is empty' })
  password: string;

  @IsBoolean({ message: 'email verified not boolean' })
  emailVerified?: boolean;

  image?: string;
}
