"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDataFromFile = void 0;
const common_1 = require("@nestjs/common");
exports.JsonDataFromFile = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.files || !req.files?.['file']) {
        throw new common_1.BadRequestException('course json file is required');
    }
    const file = req.files?.['file'][0] || req.files['file'];
    const jsonFile = JSON.parse(file?.data?.toString('utf-8'));
    return jsonFile;
});
//# sourceMappingURL=jsonDatafromFile.decorator.js.map