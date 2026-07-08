import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpService } from '@nestjs/axios';
export declare class WebhookWorker extends WorkerHost {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    process(job: Job<any>): Promise<void>;
}
