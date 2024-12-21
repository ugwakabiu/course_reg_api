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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../constants/constant");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    hashPassword(password) {
        if (!password)
            return;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    async findManyUser(param) {
        return this.userRepository.findManyUser(param);
    }
    async createUser(user) {
        const hash = this.hashPassword(user.password);
        return this.userRepository.createUser({
            password: hash,
            username: user.username,
            active: user.active,
        });
    }
    async findUniqueUser(param) {
        return this.userRepository.findUniqueUser(param);
    }
    async authAuser(cred) {
        const user = await this.findUniqueUser({
            where: {
                username: cred.username,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        const isMatch = bcrypt.compareSync(cred?.password, user?.password);
        if (!isMatch) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        const payload = { sub: user.id };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: constant_1.constant.ACCESS_TOKEN_MAX_AGE,
        });
        return { accessToken, user };
    }
    async updateUser(key, data) {
        if (data.password) {
            data.password = this.hashPassword(String(data.password));
        }
        return this.userRepository.updateUser({ where: key, data });
    }
    async updatePassword(id, data) {
        const user = await this.findUniqueUser({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = bcrypt.compareSync(data.currentPassword, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Invalid current password');
        }
        return this.updateUser({ id }, { password: data.newPassword });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map