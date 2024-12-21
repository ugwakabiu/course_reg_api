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
exports.ConfigController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../user/guards/auth.guard");
const role_guard_1 = require("../user/guards/role.guard");
const rolesAllowed_1 = require("../user/guards/rolesAllowed");
const config_service_1 = require("./config.service");
const config_validation_1 = require("./validation/config.validation");
const zodValidation_pipe_1 = require("../utils/zodValidation.pipe");
const resMsg_util_1 = require("../utils/resMsg.util");
let ConfigController = class ConfigController {
    constructor(configService) {
        this.configService = configService;
    }
    async update(body) {
        await this.configService.update(body);
        return (0, resMsg_util_1.resMsgUtil)('Config updated successfully');
    }
    async get() {
        const config = await this.configService.get();
        return (0, resMsg_util_1.resMsgUtil)('Config fetched successfully', config);
    }
};
exports.ConfigController = ConfigController;
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(config_validation_1.updateConfigValidation)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "get", null);
exports.ConfigController = ConfigController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Controller)('config'),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], ConfigController);
//# sourceMappingURL=config.controller.js.map