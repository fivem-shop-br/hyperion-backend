import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../app/entities/user';
import { Roles } from './decorators/roles.decorator';
import { Role } from './roles/role.enum';
import { FindUserById } from '../app/use-cases/user/find-user';
import { UserViewModel } from '../infra/http/view-models/user-view-model';
import { Throttle } from '@nestjs/throttler';
import { UpdateUser } from 'src/app/use-cases/user/update-user';
import { UserFromJwt } from './models/UserFromJwt';
import updateMe from './dtos/update-me';
import { validate } from 'class-validator';
import { Error } from 'src/utils/error.filter';

interface updateMeProps {
  user: UserFromJwt;
  body: updateMe;
}

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private findUserById: FindUserById,
    private updateUser: UpdateUser,
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

  @Patch('me')
  async updateMe(@Request() { user, body }: updateMeProps) {
    const update = new updateMe();

    Object.keys(body).forEach((item) => {
      update[item] = body[item];
    });

    const validates = await validate(update);
    if (validates.length)
      throw new Error({
        message: validates.map((index) => index.constraints),
        statusCode: 400,
      });

    return await this.updateUser.execute(new User({ ...user, ...body }));
  }
}
