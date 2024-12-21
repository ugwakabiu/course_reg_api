import { CreateUserDto } from './validationSchema/createUser.validationSchema';
import { UserService } from './user.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { UpdatePasswordDto } from './validationSchema/updatePassword.validationSchema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getSingleUsers(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    getMannyUsers(): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    createUser(user: CreateUserDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    userLogin(cred: CreateUserDto, res: Response): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    logout(res: Response): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    updateUserpassword(userId: string, body: UpdatePasswordDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    updateUser(id: string, body: Prisma.UserUpdateInput): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    addUserToken(id: string, token: number): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    subtractUserToken(id: string, token: number): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
}
