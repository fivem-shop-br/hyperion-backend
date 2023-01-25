import { IsNotEmpty, IsEmpty } from 'class-validator';

export default class updateMe {
  @IsEmpty({ message: 'id não pode ser alterado aqui.' })
  id: string;

  @IsNotEmpty({ message: 'Name não pode ser vazio.' })
  name: string;

  @IsEmpty({ message: 'email não pode ser alterado aqui.' })
  email: string;

  @IsEmpty({ message: 'password não pode ser alterado aqui.' })
  password: string;

  emailVerified?: boolean;
  image?: string;
}
