import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';

@Processor('analytics-processing')
@Injectable()
export class AnalyticsWorker extends WorkerHost {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const {
      linkId,
      profileId,
      visitorId,
      country,
      device,
      os,
      browser,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    } = job.data;

    // 1. Log Raw Click Event
    await this.db.clickEvent.create({
      data: {
        profileId,
        linkId,
        visitorId,
        country,
        device,
        os,
        browser,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
      },
    });

    // 2. Aggregate counts daily (UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await this.db.analytics.upsert({
      where: {
        profileId_linkId_date_countryCode_deviceType: {
          profileId,
          linkId,
          date: today,
          countryCode: country || 'US',
          deviceType: device || 'desktop',
        },
      },
      create: {
        profileId,
        linkId,
        date: today,
        countryCode: country || 'US',
        deviceType: device || 'desktop',
        clicksCount: 1,
        visitorsCount: 1,
      },
      update: {
        clicksCount: { increment: 1 },
      },
    });
  }
}
