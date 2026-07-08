import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from "../database/database.service";
export declare class ImageWorker extends WorkerHost {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    process(job: Job<any>): Promise<void>;
}
