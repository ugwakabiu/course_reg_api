/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';
import { constant } from 'src/constants/constant';
import { Response } from 'supertest';
import { UserService } from '../user.service';

@Injectable()
export class deserializeUserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, _res: Response, nxt: NextFunction) {
    const accessToken = req.cookies[constant.ACCESS_TOKEN_NAME];

    if (!accessToken) return nxt();

    try {
      const verifiedJwt = this.jwtService?.verify<{ sub: string }>(accessToken);
      const user = await this.userService.findUniqueUser({
        where: { id: verifiedJwt.sub },
      });
      req.user = user;
    } catch {}

    return nxt();
  }
}
