import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('email-processing') private readonly emailQueue: Queue,
  ) {}

  async sendEmail(to: string, templateName: string, context: any): Promise<void> {
    await this.emailQueue.add('send-email', {
      to,
      templateName,
      context,
    });
  }
}
