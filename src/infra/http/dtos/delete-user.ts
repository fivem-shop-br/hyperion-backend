import { IsNotEmpty } from 'class-validator';

export default class deleteUser {
  @IsNotEmpty({ message: 'id is empty' })
  id: string;
}
