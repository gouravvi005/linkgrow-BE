import { DatabaseService } from "../database/database.service";
export declare class SettingController {
    private readonly db;
    constructor(db: DatabaseService);
    getProfile(req: any): Promise<{
        id: string | undefined;
        name: string | undefined;
        userName: string | undefined;
        email: string | undefined;
        phone: string;
        avatar: string;
        status: string;
        role: string;
        subscription: string;
    }>;
    getNotification(): {
        emailSubscription: boolean;
        desktopNotification: boolean;
        activityUpdate: boolean;
    };
    getBilling(req: any): Promise<{
        paymentMethod: string;
        cardType: string;
        lastFourDigits: string;
        status: string;
        planName: string;
        currentPeriodEnd: Date;
    }>;
    getIntergration(): never[];
    getIntegration(): never[];
}
