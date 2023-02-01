import { IsNotEmpty } from 'class-validator';

export default class updateCategory {
  @IsNotEmpty({ message: 'id não pode ser vazio.' })
  id: string;

  @IsNotEmpty({ message: 'shop_slug não pode ser vazio.' })
  shop_slug: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;
}
