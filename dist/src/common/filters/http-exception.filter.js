"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = [];
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const resContent = exception.getResponse();
            if (typeof resContent === 'object' && resContent !== null) {
                message = resContent.message || exception.message;
                errors = resContent.errors || [];
            }
            else {
                message = exception.message;
            }
        }
        else if (exception instanceof zod_1.ZodError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Validation failed';
            errors = exception.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
        }
        else if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                message = 'Unique constraint violation';
                errors = [
                    {
                        field: exception.meta?.target?.join(',') || 'unknown',
                        message: 'Value already exists',
                    },
                ];
            }
            else if (exception.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Record not found';
            }
            else {
                message = `Database query error: ${exception.message}`;
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        response.status(status).json({
            success: false,
            message,
            errors: errors.length > 0 ? errors : [message],
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map