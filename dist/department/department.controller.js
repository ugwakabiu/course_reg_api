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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../user/guards/role.guard");
const rolesAllowed_1 = require("../user/guards/rolesAllowed");
const zodValidation_pipe_1 = require("../utils/zodValidation.pipe");
const department_validationSchema_1 = require("./validationSchemas/department.validationSchema");
const department_service_1 = require("./department.service");
const resMsg_util_1 = require("../utils/resMsg.util");
const registerCourse_validationSchema_1 = require("./validationSchemas/registerCourse.validationSchema");
const auth_guard_1 = require("../user/guards/auth.guard");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async getDepartments() {
        const departments = await this.departmentService.getDepartments();
        return (0, resMsg_util_1.resMsgUtil)('departments fetched successfully', departments);
    }
    async getSingleDepartment(id) {
        const department = await this.departmentService.getSingleDepartment(id);
        const transformedDep = {
            ...department,
            courses: department.courses.map((course) => course.course),
        };
        return (0, resMsg_util_1.resMsgUtil)('department fetched successfully', transformedDep);
    }
    async createDepartment(body) {
        const department = await this.departmentService.create(body);
        return (0, resMsg_util_1.resMsgUtil)('department created successfully', department);
    }
    async updateDepartment(id, body) {
        const department = await this.departmentService.update(id, body);
        return (0, resMsg_util_1.resMsgUtil)('department updated successfully', department);
    }
    async deleteDepartment(id) {
        const department = await this.departmentService.delete(id);
        return (0, resMsg_util_1.resMsgUtil)('department deleted successfully', department);
    }
    async registerCourse(id, body) {
        const { count } = await this.departmentService.registerCourse(id, body.courseId);
        const message = `${count} course${count > 1 ? 's' : ''} registered successfully`;
        return (0, resMsg_util_1.resMsgUtil)(message);
    }
    async deleteRegisteredCourse(id, body) {
        const { count } = await this.departmentService.deleteRegisteredCourse(id, body.courseId);
        const message = `${count} course${count > 1 ? 's' : ''} deleted successfully`;
        return (0, resMsg_util_1.resMsgUtil)(message);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getSingleDepartment", null);
__decorate([
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(department_validationSchema_1.createDepartmentValidationSchema)),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(department_validationSchema_1.updateDepartmentValidationSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(registerCourse_validationSchema_1.registerCourseValidationSchema)),
    (0, common_1.Post)(':id/register-course'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "registerCourse", null);
__decorate([
    (0, common_1.UsePipes)(new zodValidation_pipe_1.ZodValidationPipe(registerCourse_validationSchema_1.registerCourseValidationSchema)),
    (0, common_1.Delete)(':id/delete-registered-course'),
    (0, common_1.Bind)((0, common_1.Param)('id'), (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleteRegisteredCourse", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, rolesAllowed_1.RolesAllowed)(['admin']),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Controller)('department'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map