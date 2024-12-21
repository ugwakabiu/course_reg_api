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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const resMsg_util_1 = require("../utils/resMsg.util");
const course_validationSchema_1 = require("./validationSchema/course.validationSchema");
const rolesAllowed_1 = require("../user/guards/rolesAllowed");
const role_guard_1 = require("../user/guards/role.guard");
const zodValidation_pipe_1 = require("../utils/zodValidation.pipe");
const fileUpload_interceptor_1 = require("./fileUpload.interceptor");
const auth_guard_1 = require("../user/guards/auth.guard");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getCourses() {
        const courses = await this.courseService.findMany();
        return (0, resMsg_util_1.resMsgUtil)('courses fetched successfully', courses);
    }
    async getSingleCourses(id) {
        const course = await this.courseService.findUnique(id);
        return (0, resMsg_util_1.resMsgUtil)('course fetched successfully', course);
    }
    async createCourse(course) {
        const newCourse = await this.courseService.create(course);
        return (0, resMsg_util_1.resMsgUtil)('course created successfully', newCourse);
    }
    async updateCourse(id, data) {
        if (!data)
            return 'no changes found';
        const updatedCourse = await this.courseService.update({
            where: { id },
            data,
        });
        return (0, resMsg_util_1.resMsgUtil)('course updated successfully', updatedCourse);
    }
    async deleteCourse(id) {
        const deletedCourse = await this.courseService.delete(id);
        const message = `${deletedCourse.count} course${deletedCourse.count > 1 ? 's' : ''} deleted successfully`;
        return (0, resMsg_util_1.resMsgUtil)(message);
    }
    async uploadCourse(course) {
        const { count } = await this.courseService.createMany(course);
        return (0, resMsg_util_1.resMsgUtil)(`${count} course${count > 1 ? 's' : ''} created successfully`);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getSingleCourses", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(course_validationSchema_1.createCourseValidationSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(course_validationSchema_1.updateCourseValidationSchema)),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, common_1.Bind)((0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)(fileUpload_interceptor_1.FileUploadInterceptor),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(course_validationSchema_1.createCourseValidationSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map