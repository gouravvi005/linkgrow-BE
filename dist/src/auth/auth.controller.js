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
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(body, res) {
        try {
            const response = await this.authService.auth.api.signUpEmail({
                body: {
                    email: body.email,
                    password: body.password,
                    name: body.userName || body.name || body.email.split('@')[0],
                    username: body.userName || body.username || body.email.split('@')[0],
                    phone: body.phone,
                    provider: 'credentials',
                    status: 'active',
                    role: 'user',
                    subscription: 'free',
                },
                asResponse: true,
            });
            response.headers.forEach((val, key) => {
                res.setHeader(key, val);
            });
            return res.status(response.status).json(await response.json());
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message || err });
        }
    }
    async login(body, res) {
        try {
            const response = await this.authService.auth.api.signInEmail({
                body: {
                    email: body.email,
                    password: body.password,
                },
                asResponse: true,
            });
            try {
                const user = await this.authService.db.user.findFirst({
                    where: { email: body.email },
                });
                if (user) {
                    await this.authService.db.user.update({
                        where: { id: user.id },
                        data: { lastLogin: new Date() },
                    });
                }
            }
            catch (dbErr) {
                console.error('Error updating lastLogin:', dbErr);
            }
            response.headers.forEach((val, key) => {
                res.setHeader(key, val);
            });
            return res.status(response.status).json(await response.json());
        }
        catch (err) {
            return res.status(401).json({ success: false, message: err.message || err });
        }
    }
    async logout(req, res) {
        try {
            const headers = new Headers();
            Object.entries(req.headers).forEach(([key, val]) => {
                if (val) {
                    headers.append(key, Array.isArray(val) ? val.join(',') : val);
                }
            });
            const response = await this.authService.auth.api.signOut({
                headers,
                asResponse: true,
            });
            response.headers.forEach((val, key) => {
                res.setHeader(key, val);
            });
            return res.status(response.status).json(await response.json());
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message || err });
        }
    }
    async forgotPassword(body, res) {
        try {
            const response = await this.authService.auth.api.forgetPassword({
                body: {
                    email: body.email,
                    redirectTo: body.redirectTo || 'http://localhost:3000/reset-password',
                },
                asResponse: true,
            });
            response.headers.forEach((val, key) => {
                res.setHeader(key, val);
            });
            return res.status(response.status).json(await response.json());
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message || err });
        }
    }
    async resetPassword(body, res) {
        try {
            const response = await this.authService.auth.api.resetPassword({
                body: {
                    newPassword: body.newPassword || body.password,
                    token: body.token,
                },
                asResponse: true,
            });
            response.headers.forEach((val, key) => {
                res.setHeader(key, val);
            });
            return res.status(response.status).json(await response.json());
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message || err });
        }
    }
    async handleAuth(req, res) {
        return this.authService.handler(req, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.All)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleAuth", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map