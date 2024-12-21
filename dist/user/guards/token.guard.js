"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGuard = void 0;
const common_1 = require("@nestjs/common");
let TokenGuard = class TokenGuard {
    canActivate(context) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const user = req?.user;
        if (user.role == 'developer') {
            return true;
        }
        if (user?.token < 1) {
            throw new common_1.UnauthorizedException('insufficient token');
        }
        return true;
    }
};
exports.TokenGuard = TokenGuard;
exports.TokenGuard = TokenGuard = __decorate([
    (0, common_1.Injectable)()
], TokenGuard);
//# sourceMappingURL=token.guard.js.map