import { IsNotEmpty } from 'class-validator';

export default class deleteUser {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;
}
