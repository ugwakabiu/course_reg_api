import { UserService } from 'src/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getConfigUtil } from '../getConfig.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { constant } from 'src/constants/constant';
import { CreateUserDto } from 'src/user/validationSchema/createUser.validationSchema';

@Injectable()
export class AllowLoginGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request<any, any, CreateUserDto>>();
    const res = ctx.getResponse<Response>();

    const allowLogin = await getConfigUtil(this.prisma, 'allow_login');
    const user =
      req.user ||
      (await this.userService.findUniqueUser({
        where: { username: req.body.username },
      }));

    if (!allowLogin && user.role != 'admin') {
      res.clearCookie(constant.ACCESS_TOKEN_NAME);
      throw new UnauthorizedException('login is currently unavailable');
    }

    return true;
  }
}
