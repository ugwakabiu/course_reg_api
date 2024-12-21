import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesAllowed } from './rolesAllowed';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const role =
      this.reflector.get(RolesAllowed, context.getHandler()) ||
      this.reflector.get(RolesAllowed, context.getClass());

    if (req.user.role == 'developer') {
      return true;
    }

    return role?.includes(req?.user?.role);
  }
}
