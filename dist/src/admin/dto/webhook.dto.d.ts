import { z } from 'zod';
export declare const createWebhookSchema: z.ZodObject<{
    url: z.ZodString;
    secret: z.ZodString;
    events: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const updateWebhookSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    secret: z.ZodOptional<z.ZodString>;
    events: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateWebhookDto = z.infer<typeof createWebhookSchema>;
export type UpdateWebhookDto = z.infer<typeof updateWebhookSchema>;
export type WebhookResponseDto = {
    id: string;
    workspaceId: string;
    url: string;
    events: string[];
    isActive: boolean;
    createdAt: Date;
};
