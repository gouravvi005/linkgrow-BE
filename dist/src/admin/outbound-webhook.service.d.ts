import { DatabaseService } from "../database/database.service";
import { Queue } from 'bullmq';
export declare class OutboundWebhookService {
    private readonly db;
    private readonly webhookQueue;
    constructor(db: DatabaseService, webhookQueue: Queue);
    triggerEvent(workspaceId: string, eventType: string, payload: any): Promise<void>;
}
