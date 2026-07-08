import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class WhatsappWorker extends WorkerHost {
    private readonly config;
    private readonly httpService;
    private readonly logger;
    constructor(config: ConfigService, httpService: HttpService);
    process(job: Job<any>): Promise<void>;
}
