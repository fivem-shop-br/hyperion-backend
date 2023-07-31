import { IsDate, IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { ShopsProps } from 'src/app/entities/shop';

export default class createShop {
  @IsNotEmpty({ message: 'slug não pode ser vazio.' })
  slug: string;

  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  name: string;

  @IsIn(['free', 'premium', 'ultra', 'super'])
  @IsNotEmpty({ message: 'planType não pode ser vazio.' })
  planType: ShopsProps['planType'];

  @IsNotEmpty({ message: 'expiredAt não pode ser vazio.' })
  @IsDateString()
  expiredAt: Date;

  id: string;
  description?: string;
  logo?: string;
  banner?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
