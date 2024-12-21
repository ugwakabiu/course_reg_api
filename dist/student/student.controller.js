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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_validationSchema_1 = require("./valdationSchemas/student.validationSchema");
const student_service_1 = require("./student.service");
const authenticatedUser_decorator_1 = require("../user/authenticatedUser.decorator");
const resMsg_util_1 = require("../utils/resMsg.util");
const zodValidation_pipe_1 = require("../utils/zodValidation.pipe");
const registerCourse_validationSchema_1 = require("../department/validationSchemas/registerCourse.validationSchema");
const auth_guard_1 = require("../user/guards/auth.guard");
const active_guard_1 = require("../user/guards/active.guard");
const token_guard_1 = require("../user/guards/token.guard");
const allowDataUpdate_guard_1 = require("../config/guard/allowDataUpdate.guard");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async getAll() {
        const students = await this.studentService.findAll();
        return (0, resMsg_util_1.resMsgUtil)('Students fetched successfully', students);
    }
    async create(body, userId) {
        const createdStudent = await this.studentService.create(body, userId);
        await this.studentService.registerRecommendedCourse(createdStudent.id);
        return (0, resMsg_util_1.resMsgUtil)('Student created successfully', createdStudent);
    }
    async delete(id) {
        const deletedStudent = await this.studentService.delete(id);
        return (0, resMsg_util_1.resMsgUtil)('Student deleted successfully', deletedStudent);
    }
    async uploadLoadPassport(id, req) {
        const file = (Array.isArray(req.files) ? req.files[0] : req.files)?.['passport'];
        if (!file) {
            throw new common_1.BadRequestException('Passport file is required');
        }
        const uploadRes = await this.studentService.uploadPassport(id, file);
        return (0, resMsg_util_1.resMsgUtil)('passport updated successfull', uploadRes);
    }
    async get(id) {
        const student = await this.studentService.find({ id });
        if (!student)
            throw new common_1.NotFoundException('student not found');
        return (0, resMsg_util_1.resMsgUtil)('Student fetched successfully', student);
    }
    async update(id, body) {
        const updatedUser = await this.studentService.update(id, body);
        return (0, resMsg_util_1.resMsgUtil)('Student updated successfully', updatedUser);
    }
    async registerCourse(id, body) {
        const { count } = await this.studentService.registerCourse(id, body.courseId);
        return (0, resMsg_util_1.resMsgUtil)(`${count} course${count > 1 ? 's' : ''} registered successfully`);
    }
    async deleteRegisteredCourse(id, body) {
        const { count } = await this.studentService.deleteRegisteredCourses(id, body.courseId);
        return (0, resMsg_util_1.resMsgUtil)(`${count} course${count > 1 ? 's' : ''} deleted successfully`);
    }
    async getRecomendedCourses(id) {
        const recommendedCourses = await this.studentService.getRecommendedCourses(id, 'recommended');
        return (0, resMsg_util_1.resMsgUtil)('Recommended courses fetched successfully', recommendedCourses);
    }
    async getRegisteredCourses(id) {
        const registeredCourses = await this.studentService.getRegisteredCourses(id);
        return (0, resMsg_util_1.resMsgUtil)('Registered courses fetched successfully', registeredCourses);
    }
    async printSlip(studentId, userId) {
        const student = await this.studentService.printSlip(studentId, userId);
        return (0, resMsg_util_1.resMsgUtil)('print slip success', student);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.Bind)((0, common_1.Body)(), (0, authenticatedUser_decorator_1.AuthenticatedUser)('id')),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(student_validationSchema_1.createStudentValidationSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/passport'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "uploadLoadPassport", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(allowDataUpdate_guard_1.AllowDataUpdateGuard),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(student_validationSchema_1.updateStudentValidationSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/register-course'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(registerCourse_validationSchema_1.registerCourseValidationSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "registerCourse", null);
__decorate([
    (0, common_1.Delete)(':id/registered-course'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(registerCourse_validationSchema_1.registerCourseValidationSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteRegisteredCourse", null);
__decorate([
    (0, common_1.Get)(':id/recomended-courses'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getRecomendedCourses", null);
__decorate([
    (0, common_1.Get)(':id/registered-courses'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getRegisteredCourses", null);
__decorate([
    (0, common_1.Post)(':id/print'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, authenticatedUser_decorator_1.AuthenticatedUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "printSlip", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, active_guard_1.ActiveGuard, token_guard_1.TokenGuard),
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map