import { IsNotEmpty } from 'class-validator';

export default class createCategory {
  id: string;

  @IsNotEmpty({ message: 'shopSlug não pode ser vazio.' })
  shopSlug: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;
}
