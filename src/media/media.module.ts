import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ImageWorker } from '@/workers/image.worker';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image-processing',
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, ImageWorker],
  exports: [MediaService, BullModule],
})
export class MediaModule {}
