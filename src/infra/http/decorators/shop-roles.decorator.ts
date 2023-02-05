import { SetMetadata } from '@nestjs/common';
import { UserInShopRoles } from '@prisma/client';

export const SHOP_ROLES_KEY = 'shop_roles';
export const shopRoles = (...roles: UserInShopRoles[]) =>
  SetMetadata(SHOP_ROLES_KEY, roles);
