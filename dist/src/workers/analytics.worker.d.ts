import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from "../database/database.service";
export declare class AnalyticsWorker extends WorkerHost {
    private readonly db;
    constructor(db: DatabaseService);
    process(job: Job<any>): Promise<void>;
}
