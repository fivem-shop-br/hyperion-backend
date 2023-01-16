import { Role } from '../roles/role.enum';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
  roles: Role;
}
