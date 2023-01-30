import { IsNotEmpty } from 'class-validator';

export default class deleteCategory {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;
}
