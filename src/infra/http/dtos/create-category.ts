import { IsNotEmpty } from 'class-validator';

export default class createCategory {
  id: string;

  @IsNotEmpty({ message: 'shop_slug não pode ser vazio.' })
  shop_slug: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;
}
