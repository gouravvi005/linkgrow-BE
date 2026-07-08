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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const authData_1 = require("../mock-data/authData");
let AuthController = class AuthController {
    users = [...authData_1.signInUserData];
    signUp(body) {
        const { userName, email, password } = body;
        const existing = this.users.find((u) => u.email === email);
        if (existing) {
            return {
                status: 'success',
                message: 'Registration successful',
            };
        }
        const newUser = {
            id: `user_${Date.now()}`,
            avatar: '/img/avatars/thumb-1.jpg',
            userName: userName || email.split('@')[0],
            email,
            authority: ['user'],
            password,
            accountUserName: (userName || email.split('@')[0]).toLowerCase().replace(/\s+/g, '_'),
        };
        this.users.push(newUser);
        return {
            status: 'success',
            message: 'Registration successful',
        };
    }
    forgotPassword(body) {
        return {
            status: 'success',
            message: 'Password reset email sent',
        };
    }
    resetPassword(body) {
        return {
            status: 'success',
            message: 'Password reset successful',
        };
    }
    saveUsername(body) {
        return {
            status: 'success',
            message: 'Username saved successfully',
        };
    }
    validateCredential(body) {
        const { email, password } = body;
        const user = this.users.find((u) => u.email === email && u.password === password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('save-username'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "saveUsername", null);
__decorate([
    (0, common_1.Post)('validate-credential'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validateCredential", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('mock/auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map