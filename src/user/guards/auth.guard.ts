import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (req.url.includes('login')) {
      return true; // Allow access to login endpoint
    }

    if (!req?.['user']) throw new UnauthorizedException();

    return true;
  }
}
