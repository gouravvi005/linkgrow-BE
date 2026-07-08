import type { Request } from 'express';
import { PaymentsService } from './payments.service';
import { z } from 'zod';
declare const createOrderSchema: z.ZodObject<{
    planId: z.ZodString;
    provider: z.ZodEnum<{
        stripe: "stripe";
        razorpay: "razorpay";
    }>;
    successUrl: z.ZodOptional<z.ZodString>;
    cancelUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type CreateOrderDto = z.infer<typeof createOrderSchema>;
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(workspaceId: string, body: CreateOrderDto): Promise<{
        url: string | null;
    } | {
        subscriptionId: string;
        keyId: string | undefined;
    }>;
    stripeWebhook(req: Request, signature: string): Promise<{
        received: boolean;
    }>;
    razorpayWebhook(req: Request, signature: string): Promise<{
        received: boolean;
    }>;
}
export {};
