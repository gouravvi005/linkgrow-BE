import { Queue } from 'bullmq';
export declare class EmailService {
    private readonly emailQueue;
    constructor(emailQueue: Queue);
    sendEmail(to: string, templateName: string, context: any): Promise<void>;
}
