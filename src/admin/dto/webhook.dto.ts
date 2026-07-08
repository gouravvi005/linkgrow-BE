import { z } from 'zod';

export const createWebhookSchema = z.object({
  url: z.string().url(),
  secret: z.string().min(8),
  events: z.array(z.string()).nonempty(),
});

export const updateWebhookSchema = z.object({
  url: z.string().url().optional(),
  secret: z.string().min(8).optional(),
  events: z.array(z.string()).nonempty().optional(),
  isActive: z.boolean().optional(),
});

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
