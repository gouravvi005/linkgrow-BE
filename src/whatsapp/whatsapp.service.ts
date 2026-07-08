import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class WhatsappService {
  constructor(
    @InjectQueue('whatsapp-processing') private readonly whatsappQueue: Queue,
  ) {}

  async sendNotification(to: string, templateName: string, variables: string[]): Promise<void> {
    await this.whatsappQueue.add('send-whatsapp', {
      to,
      templateName,
      variables,
    });
  }
}
