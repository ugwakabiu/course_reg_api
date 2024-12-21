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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const zodValidation_pipe_1 = require("../utils/zodValidation.pipe");
const createUser_validationSchema_1 = require("./validationSchema/createUser.validationSchema");
const user_service_1 = require("./user.service");
const resMsg_util_1 = require("../utils/resMsg.util");
const omitObj_util_1 = require("../utils/omitObj.util");
const constant_1 = require("../constants/constant");
const parseAndConvertUnit_util_1 = require("../utils/parseAndConvertUnit.util");
const client_1 = require("@prisma/client");
const updateUser_validationSchema_1 = require("./validationSchema/updateUser.validationSchema");
const auth_guard_1 = require("./guards/auth.guard");
const role_guard_1 = require("./guards/role.guard");
const rolesAllowed_1 = require("./guards/rolesAllowed");
const updatePassword_validationSchema_1 = require("./validationSchema/updatePassword.validationSchema");
const authenticatedUser_decorator_1 = require("./authenticatedUser.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getSingleUsers(id) {
        const selectFiled = {
            id: true,
            registrationNumber: true,
            department: {
                select: {
                    name: true,
                },
            },
            level: true,
            PersonalInformation: {
                select: {
                    firstName: true,
                    lastName: true,
                    otherNames: true,
                },
            },
        };
        const user = await this.userService.findUniqueUser({
            where: {
                id,
            },
            select: {
                active: true,
                role: true,
                username: true,
                token: true,
                usedToken: true,
                registeredStudents: {
                    select: selectFiled,
                },
                printedStudents: {
                    select: selectFiled,
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return (0, resMsg_util_1.resMsgUtil)('user fetched successfully', user);
    }
    async getMannyUsers() {
        const users = await this.userService.findManyUser({
            select: {
                id: true,
                active: true,
                role: true,
                username: true,
                token: true,
                usedToken: true,
                registeredStudents: true,
                printedStudents: true,
                _count: {
                    select: {
                        printedStudents: true,
                        registeredStudents: true,
                    },
                },
            },
        });
        return (0, resMsg_util_1.resMsgUtil)('users fetched successfully', users);
    }
    async createUser(user) {
        const createRes = await this.userService.createUser(user);
        return (0, resMsg_util_1.resMsgUtil)('user created successfully', (0, omitObj_util_1.omitObjUtil)(createRes, ['password']));
    }
    async userLogin(cred, res) {
        res.clearCookie(constant_1.constant.ACCESS_TOKEN_NAME);
        const data = await this.userService.authAuser(cred);
        if (!data) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        res.cookie(constant_1.constant.ACCESS_TOKEN_NAME, data.accessToken, {
            maxAge: (0, parseAndConvertUnit_util_1.parseAndConvertUnitUtil)(constant_1.constant.ACCESS_TOKEN_MAX_AGE, 'ms'),
        });
        return (0, resMsg_util_1.resMsgUtil)('login success', (0, omitObj_util_1.omitObjUtil)(data.user, ['password']));
    }
    async logout(res) {
        res.clearCookie(constant_1.constant.ACCESS_TOKEN_NAME);
        return (0, resMsg_util_1.resMsgUtil)('logout success');
    }
    async updateUserpassword(userId, body) {
        await this.userService.updatePassword(userId, body);
        return (0, resMsg_util_1.resMsgUtil)('password updated successfully');
    }
    async updateUser(id, body) {
        const res = await this.userService.updateUser({ id }, body);
        return (0, resMsg_util_1.resMsgUtil)('user updated successfully', (0, omitObj_util_1.omitObjUtil)(res, ['password']));
    }
    async addUserToken(id, token) {
        const res = await this.userService.updateUser({ id }, { token: { increment: token } });
        return (0, resMsg_util_1.resMsgUtil)('user token updated successfully', (0, omitObj_util_1.omitObjUtil)(res, ['password']));
    }
    async subtractUserToken(id, token) {
        const res = await this.userService.updateUser({ id }, { token: { decrement: token } });
        return (0, resMsg_util_1.resMsgUtil)('user token updated successfully', (0, omitObj_util_1.omitObjUtil)(res, ['password']));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSingleUsers", null);
__decorate([
    (0, common_1.Get)(),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMannyUsers", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(createUser_validationSchema_1.createUserValidationSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(createUser_validationSchema_1.createUserValidationSchema)),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Bind)((0, common_1.Body)(), (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('update-password'),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(updatePassword_validationSchema_1.updatePasswordValidationSchema)),
    (0, common_1.Bind)((0, authenticatedUser_decorator_1.AuthenticatedUser)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserpassword", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(updateUser_validationSchema_1.updateUserValidationSchema)),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('increment-token/:id'),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('token', new common_1.ParseIntPipe({
        exceptionFactory: () => new common_1.BadRequestException('token should be number'),
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUserToken", null);
__decorate([
    (0, common_1.Put)('decrement-token/:id'),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('token', new common_1.ParseIntPipe({
        exceptionFactory: () => new common_1.BadRequestException('token should be number'),
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subtractUserToken", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map