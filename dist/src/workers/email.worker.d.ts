import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
export declare class EmailWorker extends WorkerHost {
    private readonly config;
    private readonly logger;
    private resend;
    private fromEmail;
    constructor(config: ConfigService);
    process(job: Job<any>): Promise<void>;
}
