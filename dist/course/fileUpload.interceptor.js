"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadInterceptor = void 0;
const common_1 = require("@nestjs/common");
let FileUploadInterceptor = class FileUploadInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (!req.files || !req.files?.['file']) {
            throw new common_1.BadRequestException('course json file is required');
        }
        const file = req.files?.['file'][0] || req.files['file'];
        if (file?.mimetype != 'application/json') {
            throw new common_1.BadRequestException('Invalid file type. Only JSON files are allowed.');
        }
        const jsonFile = JSON.parse(file?.data?.toString('utf-8'));
        req.body = jsonFile;
        return next.handle();
    }
};
exports.FileUploadInterceptor = FileUploadInterceptor;
exports.FileUploadInterceptor = FileUploadInterceptor = __decorate([
    (0, common_1.Injectable)()
], FileUploadInterceptor);
//# sourceMappingURL=fileUpload.interceptor.js.map