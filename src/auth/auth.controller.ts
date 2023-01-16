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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Request() req: AuthRequest) {
    return this.authService.signIn(req.user);
  }

  @Get('me')
  @Roles(Role.Admin)
  getMe(@CurrentUser() data: User) {
    return data;
  }
}
