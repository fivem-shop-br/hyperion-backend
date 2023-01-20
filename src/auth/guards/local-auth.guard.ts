import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Error } from '../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      if (err?.response.message) {
        throw new Error({
          message: err?.response.message,
          statusCode: err?.response.statusCode,
        });
      }

      throw new Error({
        message: 'Preecha os dados, email e senha.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return user;
  }
}
