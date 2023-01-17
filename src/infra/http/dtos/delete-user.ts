import { IsNotEmpty } from 'class-validator';

export default class deleteUser {
  @IsNotEmpty({ message: 'Id não pode ser vazio.' })
  id: string;
}
