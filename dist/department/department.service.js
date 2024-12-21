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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepartmentService = class DepartmentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getDepartments() {
        return this.prismaService.department.findMany({
            include: {
                _count: {
                    select: {
                        courses: true,
                        students: true,
                    },
                },
            },
        });
    }
    async getSingleDepartment(id) {
        return this.prismaService.department.findUnique({
            where: {
                id,
            },
            include: {
                courses: {
                    orderBy: [
                        { course: { level: 'asc' } },
                        { course: { semester: 'asc' } },
                        { course: { code: 'asc' } },
                    ],
                    select: {
                        course: {
                            select: {
                                id: true,
                                title: true,
                                category: true,
                                code: true,
                                unit: true,
                                semester: true,
                                level: true,
                            },
                        },
                    },
                },
                students: {
                    include: {
                        PersonalInformation: true,
                        registeredBy: true,
                    },
                },
                _count: {
                    select: {
                        courses: true,
                        students: true,
                    },
                },
            },
        });
    }
    async getRegisteredCourses(departmentId) {
        return this.prismaService.course.findMany({
            where: {
                departments: {
                    some: {
                        departmentId,
                    },
                },
            },
        });
    }
    async create(data) {
        return this.prismaService.department.create({ data });
    }
    async update(id, data) {
        return this.prismaService.department.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prismaService.department.delete({ where: { id } });
    }
    async registerCourse(departmentId, courseId) {
        if (Array.isArray(courseId)) {
            const data = courseId.map((id) => ({ departmentId, courseId: id }));
            return this.prismaService.departmentsOnCourses.createMany({
                data,
                skipDuplicates: true,
            });
        }
        return this.prismaService.departmentsOnCourses.createMany({
            data: { courseId, departmentId },
        });
    }
    async deleteRegisteredCourse(departmentId, courseId) {
        if (Array.isArray(courseId)) {
            return this.prismaService.departmentsOnCourses.deleteMany({
                where: {
                    departmentId,
                    courseId: {
                        in: courseId,
                    },
                },
            });
        }
        return this.prismaService.departmentsOnCourses.deleteMany({
            where: {
                departmentId,
                courseId: courseId,
            },
        });
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map