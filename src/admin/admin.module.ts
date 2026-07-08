import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HttpModule } from '@nestjs/axios';
import { OutboundWebhookService } from './outbound-webhook.service';
import { AdminController } from './admin.controller';
import { WebhookWorker } from '@/workers/webhook.worker';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'webhook-processing',
    }),
  ],
  controllers: [AdminController],
  providers: [OutboundWebhookService, WebhookWorker],
  exports: [OutboundWebhookService, BullModule],
})
export class AdminModule {}
