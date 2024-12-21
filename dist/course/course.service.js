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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_repository_1 = require("./course.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseService = class CourseService {
    constructor(courseRepository, prismaService) {
        this.courseRepository = courseRepository;
        this.prismaService = prismaService;
    }
    async findUnique(id) {
        return this.prismaService.course.findUnique({
            where: { id },
            include: {
                students: true,
                departments: {
                    select: {
                        department: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findMany() {
        return this.prismaService.course.findMany({
            include: {
                _count: {
                    select: {
                        departments: true,
                        students: true,
                    },
                },
            },
            orderBy: [{ level: 'asc' }, { semester: 'asc' }, { code: 'asc' }],
        });
    }
    async update(param) {
        return this.courseRepository.update(param);
    }
    async delete(id) {
        return this.courseRepository.delete(id);
    }
    async create(course) {
        return this.courseRepository.create(course);
    }
    async createMany(course) {
        return this.courseRepository.createMany(course);
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository,
        prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map