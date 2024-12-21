import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';
import { Response } from 'supertest';
import { UserService } from '../user.service';
export declare class deserializeUserMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, _res: Response, nxt: NextFunction): Promise<void>;
}
