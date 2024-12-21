"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowLoginGuard = void 0;
const user_service_1 = require("../../user/user.service");
const common_1 = require("@nestjs/common");
const getConfig_util_1 = require("../getConfig.util");
const prisma_service_1 = require("../../prisma/prisma.service");
const constant_1 = require("../../constants/constant");
let AllowLoginGuard = class AllowLoginGuard {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async canActivate(context) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const allowLogin = await (0, getConfig_util_1.getConfigUtil)(this.prisma, 'allow_login');
        const user = req.user ||
            (await this.userService.findUniqueUser({
                where: { username: req.body.username },
            }));
        if (!allowLogin && user.role != 'admin') {
            res.clearCookie(constant_1.constant.ACCESS_TOKEN_NAME);
            throw new common_1.UnauthorizedException('login is currently unavailable');
        }
        return true;
    }
};
exports.AllowLoginGuard = AllowLoginGuard;
exports.AllowLoginGuard = AllowLoginGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], AllowLoginGuard);
//# sourceMappingURL=allowLogin.guard.js.map