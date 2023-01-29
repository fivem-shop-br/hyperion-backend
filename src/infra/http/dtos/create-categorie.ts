import { IsNotEmpty } from 'class-validator';

export default class createCategorie {
  id: string;

  @IsNotEmpty({ message: 'shop_id não pode ser vazio.' })
  shop_id: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;
}
