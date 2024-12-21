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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const department_service_1 = require("../department/department.service");
const validateImage_util_1 = require("../utils/validateImage.util");
const uploadImage_util_1 = require("../utils/uploadImage.util");
const path_1 = require("path");
const constant_1 = require("../constants/constant");
const user_service_1 = require("../user/user.service");
const getConfig_util_1 = require("../config/getConfig.util");
let StudentService = class StudentService {
    constructor(prismaService, departmentService, userService) {
        this.prismaService = prismaService;
        this.departmentService = departmentService;
        this.userService = userService;
    }
    async findAll() {
        return this.prismaService.student.findMany({
            include: {
                department: true,
                printedBy: {
                    select: {
                        username: true,
                    },
                },
                registeredBy: {
                    select: {
                        username: true,
                    },
                },
                PersonalInformation: true,
            },
            orderBy: [
                {
                    department: {
                        name: 'asc',
                    },
                },
                {
                    level: 'asc',
                },
            ],
        });
    }
    async find(params) {
        const student = await this.prismaService.student.findFirst({
            where: { OR: [{ id: params.id }, { registrationNumber: params.id }] },
            include: {
                department: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                PersonalInformation: true,
                registeredBy: { select: { username: true } },
                printedBy: { select: { username: true } },
                registeredCourses: {
                    select: {
                        course: {
                            select: {
                                id: true,
                                title: true,
                                code: true,
                                category: true,
                                level: true,
                                semester: true,
                                unit: true,
                            },
                        },
                    },
                },
            },
        });
        const transformed = {
            ...student,
            registeredCourses: student?.registeredCourses?.map((c) => c?.course),
        };
        return transformed;
    }
    async create(data, userId) {
        const { registrationNumber, level, departmentId, ...personalInfo } = data;
        return this.prismaService.student.create({
            data: {
                level,
                registrationNumber,
                departmentId,
                PersonalInformation: {
                    create: {
                        ...personalInfo,
                    },
                },
                registeredByUserId: userId,
            },
        });
    }
    async delete(id) {
        return this.prismaService.student.delete({ where: { id } });
    }
    async update(id, data) {
        const { registrationNumber, level, departmentId, ...personalInfo } = data;
        return this.prismaService.student.update({
            where: {
                id,
            },
            data: {
                level,
                registrationNumber,
                departmentId,
                PersonalInformation: {
                    update: {
                        ...personalInfo,
                    },
                },
            },
        });
    }
    async registerCourse(studentId, courseId) {
        const student = await this.find({ id: studentId });
        if (!student)
            throw new common_1.NotFoundException('student not found');
        const departmentsOnCourses = (await this.departmentService.getRegisteredCourses(student.departmentId)).map((course) => course.id);
        const courses = Array.isArray(courseId)
            ? courseId.map((id) => ({ courseId: id, studentId }))
            : [{ courseId, studentId }];
        const validCourses = courses.filter((c) => departmentsOnCourses.includes(c.courseId));
        return this.prismaService.studentOnCourses.createMany({
            data: validCourses,
            skipDuplicates: true,
        });
    }
    async deleteRegisteredCourses(studentId, courseId) {
        const courseIds = Array.isArray(courseId) ? courseId : [courseId];
        return this.prismaService.studentOnCourses.deleteMany({
            where: {
                studentId,
                courseId: { in: courseIds },
            },
        });
    }
    async getRegisteredCourses(studentId, select) {
        return this.prismaService.course.findMany({
            where: {
                students: {
                    some: {
                        studentId,
                    },
                },
            },
            select,
        });
    }
    async getRecommendedCourses(studentId, type, semester) {
        const student = await this.find({ id: studentId });
        if (!student)
            throw new common_1.NotFoundException('student not found');
        const registeredCourses = (await this.getRegisteredCourses(studentId, { id: true }))?.map((course) => course.id);
        const recomendedCourses = await this.prismaService.course.findMany({
            where: {
                id: { notIn: registeredCourses },
                semester: semester,
                level: {
                    ...(type == 'current'
                        ? { equals: student.level }
                        : { lte: student.level }),
                },
                departments: {
                    some: {
                        departmentId: student.departmentId,
                    },
                },
            },
        });
        return recomendedCourses;
    }
    async uploadPassport(studentId, file) {
        const student = await this.find({ id: studentId });
        if (!student?.id)
            throw new common_1.NotFoundException('student not found');
        const validDateRes = (0, validateImage_util_1.default)({ file, maxSize: '700kb' });
        if (!validDateRes.isValid) {
            throw new common_1.BadRequestException(validDateRes.message);
        }
        const uploadsDir = constant_1.constant.UPLOAD_DIR;
        const uploadRes = await (0, uploadImage_util_1.default)({
            fileName: student.id,
            dir: (0, path_1.join)(process.cwd(), uploadsDir),
            file,
        });
        console.log('upload res >>>', uploadRes, student);
        if (!uploadRes.uploaded) {
            throw new common_1.InternalServerErrorException('something went wrong try again later');
        }
        return await this.prismaService.personalInformation.update({
            where: { studentId },
            data: {
                passport: `/${uploadsDir}/${uploadRes?.fileName}?id=${Date.now()}`,
            },
        });
    }
    async printSlip(studentId, userId) {
        const student = await this.find({ id: studentId });
        if (!student)
            throw new common_1.NotFoundException('student not found');
        await this.prismaService.$transaction(async (prisma) => {
            await prisma.student.update({
                where: { id: student.id },
                data: {
                    printedByUserId: userId,
                },
            });
            await prisma.user.update({
                where: { id: userId },
                data: {
                    token: {
                        decrement: 1,
                    },
                    usedToken: {
                        increment: 1,
                    },
                },
            });
        });
        return student;
    }
    async registerRecommendedCourse(studentId) {
        try {
            const currentSemester = await (0, getConfig_util_1.getConfigUtil)(this.prismaService, 'current_semester');
            const recommendedCourses = await this.getRecommendedCourses(studentId, 'current', currentSemester);
            const data = recommendedCourses.map((c) => ({
                courseId: c.id,
                studentId,
            }));
            await this.prismaService.studentOnCourses.createMany({
                data,
                skipDuplicates: true,
            });
        }
        catch { }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        department_service_1.DepartmentService,
        user_service_1.UserService])
], StudentService);
//# sourceMappingURL=student.service.js.map