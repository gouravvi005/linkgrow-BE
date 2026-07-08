import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HttpModule } from '@nestjs/axios';
import { WhatsappService } from './whatsapp.service';
import { WhatsappWorker } from '@/workers/whatsapp.worker';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'whatsapp-processing',
    }),
  ],
  providers: [WhatsappService, WhatsappWorker],
  exports: [WhatsappService, BullModule],
})
export class WhatsappModule {}
