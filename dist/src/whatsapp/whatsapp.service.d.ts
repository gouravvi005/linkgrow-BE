import { Queue } from 'bullmq';
export declare class WhatsappService {
    private readonly whatsappQueue;
    constructor(whatsappQueue: Queue);
    sendNotification(to: string, templateName: string, variables: string[]): Promise<void>;
}
