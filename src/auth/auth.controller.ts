import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@app/entities/user';
import { Roles } from './decorators/roles.decorator';
import { Role } from './roles/role.enum';
import { FindUserById } from '@app/use-cases/find-user';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private findUserById: FindUserById,
  ) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Throttle(10, 60 * 2)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Request() req: AuthRequest) {
    return this.authService.signIn(req.user);
  }

  @Get('me')
  @Roles(Role.Admin)
  async getMe(@CurrentUser() { id }: User) {
    const { user } = await this.findUserById.execute({ id });
    return UserViewModel.toHTTP(user);
  }
}
