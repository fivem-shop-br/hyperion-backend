import { Role } from '../roles/role.enum';

export class UserFromJwt {
  id: string;
  email: string;
  name: string;
  roles: Role;
}
