import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AllowDataUpdateGuard implements CanActivate {
    private readonly prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}