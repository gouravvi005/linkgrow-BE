import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Processor('webhook-processing')
@Injectable()
export class WebhookWorker extends WorkerHost {
  private readonly logger = new Logger(WebhookWorker.name);

  constructor(private readonly httpService: HttpService) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const { webhookId, url, secret, eventType, payload } = job.data;
    this.logger.log(`Processing outbound webhook: ${webhookId} to ${url} for event: ${eventType}`);

    const timestamp = Date.now().toString();
    const body = {
      event: eventType,
      payload,
      timestamp,
    };

    // Calculate HMAC SHA-256 signature
    const signature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    try {
      await firstValueFrom(
        this.httpService.post(url, body, {
          headers: {
            'Content-Type': 'application/json',
            'X-Linkgrow-Signature': signature,
            'X-Linkgrow-Timestamp': timestamp,
          },
          timeout: 5000, // Timeout webhook after 5 seconds to prevent stalling the queue worker
        }),
      );
      this.logger.log(`Webhook delivery succeeded for hook: ${webhookId}`);
    } catch (err: any) {
      const errMsg = err.response?.data || err.message;
      this.logger.error(`Webhook delivery failed for hook: ${webhookId}. Error: ${errMsg}`);
      throw err; // Trigger standard BullMQ job retry
    }
  }
}
