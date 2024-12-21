"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log('exception >>>>', exception);
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (exception.code == 'P2002') {
                const fields = exception.meta?.target;
                let message = 'record already exists';
                if (fields) {
                    message = `${fields.split('_')[1]} already exist`;
                }
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message,
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                });
            }
            if (exception.code == 'P2025') {
                return response.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'record not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                });
            }
            if (exception.code == 'P2003') {
                const fields = exception.meta?.field_name;
                let message = 'record not found';
                if (fields) {
                    message = `${fields} not found`;
                }
                return response.status(common_1.HttpStatus.NOT_FOUND).json({
                    message,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                });
            }
        }
        if (exception instanceof library_1.PrismaClientValidationError) {
            return response.status(400).json({
                statusCode: 400,
                message: exception.message,
                error: 'Validation Error',
            });
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            return response.status(status).json({
                statusCode: status,
                message: exception.message,
            });
        }
        return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error',
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(library_1.PrismaClientValidationError, library_1.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma.exceptionFilter.js.map