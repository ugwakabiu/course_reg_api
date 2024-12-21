"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("./constants/constant");
const course_module_1 = require("./course/course.module");
const deserializeUser_middleware_1 = require("./user/middleware/deserializeUser.middleware");
const core_1 = require("@nestjs/core");
const prisma_exceptionFilter_1 = require("./prisma/prisma.exceptionFilter");
const department_module_1 = require("./department/department.module");
const student_module_1 = require("./student/student.module");
const config_module_1 = require("./config/config.module");
const allowLogin_guard_1 = require("./config/guard/allowLogin.guard");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(deserializeUser_middleware_1.deserializeUserMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({ global: true, secret: constant_1.constant.JWT_SECRET_KEY }),
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            course_module_1.CourseModule,
            department_module_1.DepartmentModule,
            student_module_1.StudentModule,
            config_module_1.ConfigModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_FILTER, useClass: prisma_exceptionFilter_1.PrismaExceptionFilter },
            {
                provide: core_1.APP_GUARD,
                useClass: allowLogin_guard_1.AllowLoginGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map