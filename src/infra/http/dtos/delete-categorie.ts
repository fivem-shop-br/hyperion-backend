import { IsNotEmpty } from 'class-validator';

export default class deleteCategorie {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;
}
