import type { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';
import { DatabaseService } from "../database/database.service";
export declare class AnalyticsController {
    private readonly analyticsService;
    private readonly db;
    constructor(analyticsService: AnalyticsService, db: DatabaseService);
    redirectLink(linkId: string, req: Request, res: Response, utmSource?: string, utmMedium?: string, utmCampaign?: string): Promise<void | Response<any, Record<string, any>>>;
    getDashboard(workspaceId: string): Promise<{
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
