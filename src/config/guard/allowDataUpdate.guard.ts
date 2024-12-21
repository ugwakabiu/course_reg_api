import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { getConfigUtil } from '../getConfig.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AllowDataUpdateGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const allowDataUpdate = await getConfigUtil(
      this.prisma,
      'allow_data_update',
    );
    const user = req.user;

    if (!allowDataUpdate && user.role != 'admin') {
      throw new UnauthorizedException('data update is currently unavailable');
    }

    return true;
  }
}
