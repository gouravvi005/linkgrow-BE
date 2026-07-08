import { Queue } from 'bullmq';
import { CacheService } from "../cache/cache.service";
import { DatabaseService } from "../database/database.service";
export interface ClickMetadata {
    visitorId: string;
    ip: string;
    userAgent: string;
    referrer: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
}
export declare class AnalyticsService {
    private readonly cache;
    private readonly db;
    private readonly analyticsQueue;
    constructor(cache: CacheService, db: DatabaseService, analyticsQueue: Queue);
    trackClick(linkId: string, meta: ClickMetadata): Promise<string | null>;
    getDashboardStats(profileId: string): Promise<{
        totalClicks: number;
        clicksByDevice: {
            device: string;
            count: number;
        }[];
        clicksByCountry: {
            country: string;
            count: number;
        }[];
        dailyStats: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            linkId: string | null;
            date: Date;
            clicksCount: number;
            visitorsCount: number;
            countryCode: string | null;
            deviceType: string | null;
        }[];
    }>;
}
