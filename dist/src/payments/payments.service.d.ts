import { ConfigService } from '@nestjs/config';
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { WhatsappService } from "../whatsapp/whatsapp.service";
export declare class PaymentsService {
    private readonly config;
    private readonly db;
    private readonly email;
    private readonly whatsapp;
    private readonly logger;
    private stripe;
    private razorpay;
    constructor(config: ConfigService, db: DatabaseService, email: EmailService, whatsapp: WhatsappService);
    createStripeCheckout(workspaceId: string, planId: string, successUrl: string, cancelUrl: string): Promise<{
        url: string | null;
    }>;
    createRazorpayOrder(workspaceId: string, planId: string): Promise<{
        subscriptionId: string;
        keyId: string | undefined;
    }>;
    handleStripeWebhook(rawBody: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
    handleRazorpayWebhook(body: any, signature: string): Promise<{
        received: boolean;
    }>;
    private activateSubscription;
}
