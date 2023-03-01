import { IsNotEmpty } from 'class-validator';

export default class updateShop {
  @IsNotEmpty({ message: 'slug não pode ser vazio.' })
  slug: string;

  id: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain: string;
  planType: string;
  createdAt?: Date;
  updatedAt?: Date;
}
