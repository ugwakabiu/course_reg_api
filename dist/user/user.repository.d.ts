import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(user: Prisma.UserCreateInput): Promise<User>;
    findUniqueUser(param: {
        where?: Prisma.UserFindFirstArgs['where'];
        select?: Prisma.UserFindUniqueArgs['select'];
    }): Promise<User>;
    findManyUser(param: {
        where?: Prisma.UserFindManyArgs['where'];
        select?: Prisma.UserFindManyArgs['select'];
    }): Promise<User[]>;
    updateUser(param: {
        where: Prisma.UserUpdateArgs['where'];
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
}
