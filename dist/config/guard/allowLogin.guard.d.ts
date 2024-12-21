import { UserService } from 'src/user/user.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AllowLoginGuard implements CanActivate {
    private readonly prisma;
    private readonly userService;
    constructor(prisma: PrismaService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
