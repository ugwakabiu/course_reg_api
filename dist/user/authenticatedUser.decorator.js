"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthenticatedUser = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
});
//# sourceMappingURL=authenticatedUser.decorator.js.map