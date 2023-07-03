import { IsNotEmpty } from 'class-validator';
import { ShopsProps } from 'src/app/entities/shop';
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
  planType: ShopsProps['planType'];
  expiredAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
