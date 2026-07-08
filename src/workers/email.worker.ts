import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { getEmailTemplate } from '@/email/email-templates';
import { Injectable, Logger } from '@nestjs/common';

@Processor('email-processing')
@Injectable()
export class EmailWorker extends WorkerHost {
  private readonly logger = new Logger(EmailWorker.name);
  private resend: Resend;
  private fromEmail: string;

  constructor(private readonly config: ConfigService) {
    super();
    const apiKey = this.config.get<string>('RESEND_API_KEY') || 'mock';
    this.resend = new Resend(apiKey);
    this.fromEmail = this.config.get<string>('EMAIL_FROM') || 'noreply@linkgrow.com';
  }

  async process(job: Job<any>): Promise<void> {
    const { to, templateName, context } = job.data;
    this.logger.log(`Processing email job for: ${to}, template: ${templateName}`);

    const { subject, html } = getEmailTemplate(templateName, context);

    try {
      if (this.config.get<string>('NODE_ENV') === 'test' || this.config.get<string>('RESEND_API_KEY') === 're_mock_api_key_for_development') {
        this.logger.log(`Mocking Email Sending: To=${to}, Subject="${subject}"`);
        return;
      }

      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent successfully to ${to}`);
    } catch (err: any) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
      throw err;
    }
  }
}
