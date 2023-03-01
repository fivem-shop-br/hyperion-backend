import { IsNotEmpty } from 'class-validator';

export default class deleteShop {
  @IsNotEmpty({ message: 'slug não pode ser vazio.' })
  slug: string;
}
