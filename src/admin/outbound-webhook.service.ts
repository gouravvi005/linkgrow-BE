import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class OutboundWebhookService {
  constructor(
    private readonly db: DatabaseService,
    @InjectQueue('webhook-processing') private readonly webhookQueue: Queue,
  ) {}

  async triggerEvent(workspaceId: string, eventType: string, payload: any) {
    const webhooks = await this.db.webhook.findMany({
      where: {
        workspaceId,
        isActive: true,
        deletedAt: null,
      },
    });

    for (const hook of webhooks) {
      const configuredEvents = hook.events as string[];
      if (configuredEvents.includes(eventType) || configuredEvents.includes('*')) {
        await this.webhookQueue.add('send-webhook', {
          webhookId: hook.id,
          url: hook.url,
          secret: hook.secret,
          eventType,
          payload,
        });
      }
    }
  }
}
