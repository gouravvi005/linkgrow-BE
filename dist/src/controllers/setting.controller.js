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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
let SettingController = class SettingController {
    db;
    constructor(db) {
        this.db = db;
    }
    async getProfile(req) {
        const user = req.user;
        const dbUser = await this.db.user.findUnique({
            where: { id: user.id },
        });
        return {
            id: dbUser?.id,
            name: dbUser?.name,
            userName: dbUser?.username || dbUser?.name,
            email: dbUser?.email,
            phone: dbUser?.phone || '',
            avatar: dbUser?.avatar || dbUser?.image || '',
            status: dbUser?.status || 'active',
            role: dbUser?.role || 'user',
            subscription: dbUser?.subscription || 'free',
        };
    }
    getNotification() {
        return {
            emailSubscription: true,
            desktopNotification: true,
            activityUpdate: false,
        };
    }
    async getBilling(req) {
        const user = req.user;
        const member = await this.db.workspaceMember.findFirst({
            where: { userId: user.id },
            include: { workspace: { include: { subscriptions: true } } },
        });
        const activeSub = member?.workspace?.subscriptions?.[0];
        return {
            paymentMethod: 'Stripe',
            cardType: 'Visa',
            lastFourDigits: '1234',
            status: activeSub?.status || 'INACTIVE',
            planName: activeSub ? 'Pro Plan' : 'Free Plan',
            currentPeriodEnd: activeSub?.currentPeriodEnd || new Date(),
        };
    }
    getIntergration() {
        return [];
    }
    getIntegration() {
        return [];
    }
};
exports.SettingController = SettingController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "getNotification", null);
__decorate([
    (0, common_1.Get)('billing'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getBilling", null);
__decorate([
    (0, common_1.Get)('intergration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "getIntergration", null);
__decorate([
    (0, common_1.Get)('integration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "getIntegration", null);
exports.SettingController = SettingController = __decorate([
    (0, common_1.Controller)('setting'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SettingController);
//# sourceMappingURL=setting.controller.js.map