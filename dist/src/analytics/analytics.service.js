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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const cache_service_1 = require("../cache/cache.service");
const database_service_1 = require("../database/database.service");
const user_agent_1 = require("../common/utils/user-agent");
let AnalyticsService = class AnalyticsService {
    cache;
    db;
    analyticsQueue;
    constructor(cache, db, analyticsQueue) {
        this.cache = cache;
        this.db = db;
        this.analyticsQueue = analyticsQueue;
    }
    async trackClick(linkId, meta) {
        const link = await this.db.link.findUnique({
            where: { id: linkId },
            include: { profile: true },
        });
        if (!link)
            return null;
        const ua = (0, user_agent_1.parseUserAgent)(meta.userAgent);
        const country = 'US';
        const client = this.cache.getClient();
        const today = new Date().toISOString().split('T')[0];
        const keys = [
            `analytics:clicks:link:${linkId}`,
            `analytics:clicks:profile:${link.profileId}`,
            `analytics:clicks:date:${today}:link:${linkId}`,
            `analytics:clicks:country:${country}:link:${linkId}`,
            `analytics:clicks:device:${ua.device}:link:${linkId}`,
        ];
        if (client) {
            const pipeline = client.pipeline();
            keys.forEach((key) => pipeline.incr(key));
            await pipeline.exec();
        }
        await this.analyticsQueue.add('process-click', {
            linkId,
            profileId: link.profileId,
            visitorId: meta.visitorId,
            ip: meta.ip,
            country,
            device: ua.device,
            os: ua.os,
            browser: ua.browser,
            referrer: meta.referrer,
            utmSource: meta.utmSource,
            utmMedium: meta.utmMedium,
            utmCampaign: meta.utmCampaign,
        });
        return link.url;
    }
    async getDashboardStats(profileId) {
        const totalClicks = await this.db.clickEvent.count({
            where: { profileId },
        });
        const clicksByDevice = await this.db.clickEvent.groupBy({
            by: ['device'],
            where: { profileId },
            _count: {
                id: true,
            },
        });
        const clicksByCountry = await this.db.clickEvent.groupBy({
            by: ['country'],
            where: { profileId },
            _count: {
                id: true,
            },
        });
        const dailyStats = await this.db.analytics.findMany({
            where: { profileId },
            orderBy: { date: 'asc' },
        });
        return {
            totalClicks,
            clicksByDevice: clicksByDevice.map((d) => ({
                device: d.device || 'unknown',
                count: d._count.id,
            })),
            clicksByCountry: clicksByCountry.map((c) => ({
                country: c.country || 'unknown',
                count: c._count.id,
            })),
            dailyStats,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('analytics-processing')),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        database_service_1.DatabaseService,
        bullmq_2.Queue])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map