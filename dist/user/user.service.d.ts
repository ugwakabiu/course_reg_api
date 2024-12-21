import { CreateUserDto } from './validationSchema/createUser.validationSchema';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './validationSchema/updatePassword.validationSchema';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    hashPassword(password: string): string;
    findManyUser(param?: {
        where?: Prisma.UserFindManyArgs['where'];
        select?: Prisma.UserFindUniqueArgs['select'];
    }): Promise<User[]>;
    createUser(user: CreateUserDto): Promise<User>;
    findUniqueUser(param: {
        where?: Prisma.UserFindFirstArgs['where'];
        select?: Prisma.UserFindUniqueArgs['select'];
    }): Promise<User>;
    authAuser(cred: CreateUserDto): Promise<{
        accessToken: string;
        user: User;
    }>;
    updateUser(key: Prisma.UserUpdateArgs['where'], data: Prisma.UserUpdateInput): Promise<{
        username: string;
        active: boolean | null;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.Role | null;
        token: number;
        usedToken: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, data: UpdatePasswordDto): Promise<User>;
}
