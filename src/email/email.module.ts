import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailWorker } from '@/workers/email.worker';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-processing',
    }),
  ],
  providers: [EmailService, EmailWorker],
  exports: [EmailService, BullModule],
})
export class EmailModule {}
