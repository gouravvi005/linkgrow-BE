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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
let AnalyticsWorker = class AnalyticsWorker extends bullmq_1.WorkerHost {
    db;
    constructor(db) {
        super();
        this.db = db;
    }
    async process(job) {
        const { linkId, profileId, visitorId, country, device, os, browser, referrer, utmSource, utmMedium, utmCampaign, } = job.data;
        await this.db.clickEvent.create({
            data: {
                profileId,
                linkId,
                visitorId,
                country,
                device,
                os,
                browser,
                referrer,
                utmSource,
                utmMedium,
                utmCampaign,
            },
        });
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        await this.db.analytics.upsert({
            where: {
                profileId_linkId_date_countryCode_deviceType: {
                    profileId,
                    linkId,
                    date: today,
                    countryCode: country || 'US',
                    deviceType: device || 'desktop',
                },
            },
            create: {
                profileId,
                linkId,
                date: today,
                countryCode: country || 'US',
                deviceType: device || 'desktop',
                clicksCount: 1,
                visitorsCount: 1,
            },
            update: {
                clicksCount: { increment: 1 },
            },
        });
    }
};
exports.AnalyticsWorker = AnalyticsWorker;
exports.AnalyticsWorker = AnalyticsWorker = __decorate([
    (0, bullmq_1.Processor)('analytics-processing'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AnalyticsWorker);
//# sourceMappingURL=analytics.worker.js.map