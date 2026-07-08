import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsWorker } from '@/workers/analytics.worker';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'analytics-processing',
    }),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsWorker],
  exports: [AnalyticsService, BullModule],
})
export class AnalyticsModule {}
