import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const user = req?.user;
    if (user.role == 'developer') {
      return true;
    }

    if (user?.token < 1) {
      throw new UnauthorizedException('insufficient token');
    }

    return true;
  }
}
