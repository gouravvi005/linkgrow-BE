import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Processor('whatsapp-processing')
@Injectable()
export class WhatsappWorker extends WorkerHost {
  private readonly logger = new Logger(WhatsappWorker.name);

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const { to, templateName, variables } = job.data;
    this.logger.log(`Processing WhatsApp message to: ${to}, template: ${templateName}`);

    const phoneId = this.config.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    const token = this.config.get<string>('WHATSAPP_ACCESS_TOKEN');

    if (!phoneId || !token) {
      this.logger.log(`Mocking WhatsApp Notification to ${to}: Template=${templateName}, Params=${variables.join(',')}`);
      return;
    }

    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'en_US',
        },
        components: [
          {
            type: 'body',
            parameters: variables.map((v: string) => ({
              type: 'text',
              text: v,
            })),
          },
        ],
      },
    };

    try {
      await firstValueFrom(
        this.httpService.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      this.logger.log(`WhatsApp message sent successfully to ${to}`);
    } catch (err: any) {
      const errMsg = err.response?.data?.error?.message || err.message;
      this.logger.error(`Failed to send WhatsApp message to ${to}: ${errMsg}`);
      throw err;
    }
  }
}
