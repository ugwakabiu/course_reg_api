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
exports.CourseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseRepository = class CourseRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(data) {
        return this.prismaService.course.create({ data });
    }
    async createMany(data) {
        return this.prismaService.course.createMany({ data, skipDuplicates: true });
    }
    async update(param) {
        return this.prismaService.course.update(param);
    }
    async delete(id) {
        if (Array.isArray(id)) {
            return this.prismaService.course.deleteMany({
                where: {
                    id: {
                        in: id,
                    },
                },
            });
        }
        return this.prismaService.course.deleteMany({
            where: {
                id,
            },
        });
    }
    async findMany(key, select) {
        return this.prismaService.course.findMany({
            where: key,
            select,
            orderBy: {
                level: 'desc',
            },
        });
    }
    async findOne(param) {
        return this.prismaService.course.findUnique(param);
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseRepository);
//# sourceMappingURL=course.repository.js.map