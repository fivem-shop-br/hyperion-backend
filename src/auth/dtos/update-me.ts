import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export default class updateMe {
  @IsNotEmpty({ message: 'Id não pode ser vazio.' })
  id: string;

  @IsNotEmpty({ message: 'Name não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio.' })
  @IsEmail({}, { message: 'Email precisa ser válido.' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'Password necessita de 6 characters.' })
  password: string;

  @IsBoolean()
  emailVerified?: boolean;
  image?: string;
}
