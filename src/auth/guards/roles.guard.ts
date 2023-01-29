import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Reflector } from '@nestjs/core';
import { FindUserById } from 'src/app/use-cases/user/find-user';
import { Error } from 'src/utils/error.filter';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../roles/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private findUserById: FindUserById,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const {
      user: { id },
    } = context.switchToHttp().getRequest();
    const { user } = await this.findUserById.execute({ id });

    const verify =
      requiredRoles.filter((role) => user.role?.includes(role)).length > 0;

    if (!verify)
      throw new Error({
        message: 'Você não tem permissão.',
        statusCode: HttpStatus.UNAUTHORIZED,
      });

    return verify;
  }
}
