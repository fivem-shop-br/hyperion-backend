import { IsNotEmpty } from 'class-validator';

export default class updateProduct {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;

  @IsNotEmpty({ message: 'categoryId não pode ser vazio.' })
  categoryId: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'price não pode ser vazio.' })
  price: number;

  image: string[];
}
