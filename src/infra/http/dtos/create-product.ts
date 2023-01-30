import { IsNotEmpty } from 'class-validator';

export default class createProduct {
  id: string;

  @IsNotEmpty({ message: 'category_id não pode ser vazio.' })
  category_id: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'price não pode ser vazio.' })
  price: number;

  image: string;
}
