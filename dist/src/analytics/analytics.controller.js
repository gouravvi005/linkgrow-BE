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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("./analytics.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const active_workspace_decorator_1 = require("../auth/decorators/active-workspace.decorator");
const database_service_1 = require("../database/database.service");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    db;
    constructor(analyticsService, db) {
        this.analyticsService = analyticsService;
        this.db = db;
    }
    async redirectLink(linkId, req, res, utmSource, utmMedium, utmCampaign) {
        const ipRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const ip = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw.split(',')[0].trim();
        const userAgent = req.headers['user-agent'] || '';
        const referrer = req.headers['referer'] || '';
        const visitorId = req.cookies?.['visitor_id'] || 'visitor_' + Math.random().toString(36).substring(2, 15);
        const redirectUrl = await this.analyticsService.trackClick(linkId, {
            visitorId,
            ip,
            userAgent,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
        });
        if (!redirectUrl) {
            return res.status(404).send('Link not found');
        }
        res.cookie('visitor_id', visitorId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
        return res.redirect(302, redirectUrl);
    }
    async getDashboard(workspaceId) {
        const profile = await this.db.profile.findFirst({
            where: { workspaceId, deletedAt: null },
        });
        if (!profile) {
            return {
                totalClicks: 0,
                clicksByDevice: [],
                clicksByCountry: [],
                dailyStats: [],
            };
        }
        return this.analyticsService.getDashboardStats(profile.id);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('click/:linkId'),
    __param(0, (0, common_1.Param)('linkId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('utm_source')),
    __param(4, (0, common_1.Query)('utm_medium')),
    __param(5, (0, common_1.Query)('utm_campaign')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "redirectLink", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDashboard", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
        database_service_1.DatabaseService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map