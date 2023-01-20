import { User } from '../../app/entities/user';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
