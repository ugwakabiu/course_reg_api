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
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const setConfig_util_1 = require("./setConfig.util");
const getConfig_util_1 = require("./getConfig.util");
let ConfigService = class ConfigService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async update(data) {
        const entries = Object.entries(data);
        for (let i = 0; i < entries.length; i++) {
            const current = entries[i];
            await (0, setConfig_util_1.setConfigUtil)({
                key: current[0],
                value: current[1],
                prisma: this.prismaService,
            });
        }
    }
    async get() {
        const session = await (0, getConfig_util_1.getConfigUtil)(this.prismaService, 'session');
        const semester = await (0, getConfig_util_1.getConfigUtil)(this.prismaService, 'current_semester');
        const allowLogin = await (0, getConfig_util_1.getConfigUtil)(this.prismaService, 'allow_login');
        const allowDataUpdate = await (0, getConfig_util_1.getConfigUtil)(this.prismaService, 'allow_data_update');
        return { session, semester, allowDataUpdate, allowLogin };
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConfigService);
//# sourceMappingURL=config.service.js.map