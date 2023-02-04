import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { UserInShopRoles } from '@prisma/client';
import { ShopRepository } from 'src/app/repositories/shops-repository';
import { Error } from 'src/utils/error.filter';
import { SHOP_ROLES_KEY } from '../decorators/shop-roles.decorator';

@Injectable()
export class ShopRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private shopRepository: ShopRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserInShopRoles[]>(
      SHOP_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const {
      body: { shopSlug },
      query: { shopSlug: shopSlugQuery },
      user: { id },
    } = context.switchToHttp().getRequest();
    if (!(shopSlug || shopSlugQuery)) return false;

    const { id: shopId } = await this.shopRepository.findBySlug(shopSlug);
    if (!shopId || !id) return false;

    const roles = await this.shopRepository.allRolesByUserId(id, shopId);
    const verify =
      requiredRoles.filter((role) => roles.includes(role)).length > 0;

    if (!verify)
      throw new Error({
        message: 'Você não tem permissão.',
        statusCode: HttpStatus.UNAUTHORIZED,
      });

    return verify;
  }
}
