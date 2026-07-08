import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CacheService } from '@/cache/cache.service';
import { DatabaseService } from '@/database/database.service';
import { parseUserAgent } from '@/common/utils/user-agent';

export interface ClickMetadata {
  visitorId: string;
  ip: string;
  userAgent: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly cache: CacheService,
    private readonly db: DatabaseService,
    @InjectQueue('analytics-processing') private readonly analyticsQueue: Queue,
  ) {}

  async trackClick(linkId: string, meta: ClickMetadata) {
    const link = await this.db.link.findUnique({
      where: { id: linkId },
      include: { profile: true },
    });

    if (!link) return null;

    const ua = parseUserAgent(meta.userAgent);
    const country = 'US'; // Real-world: parse via MaxMind geoip or Cloudflare header. Here we mock it.

    // 1. Increment Redis Real-time Counters
    const client = this.cache.getClient();
    const today = new Date().toISOString().split('T')[0];

    const keys = [
      `analytics:clicks:link:${linkId}`,
      `analytics:clicks:profile:${link.profileId}`,
      `analytics:clicks:date:${today}:link:${linkId}`,
      `analytics:clicks:country:${country}:link:${linkId}`,
      `analytics:clicks:device:${ua.device}:link:${linkId}`,
    ];

    if (client) {
      const pipeline = client.pipeline();
      keys.forEach((key) => pipeline.incr(key));
      await pipeline.exec();
    }

    // 2. Queue Job for Heavy DB Write in BullMQ Worker
    await this.analyticsQueue.add('process-click', {
      linkId,
      profileId: link.profileId,
      visitorId: meta.visitorId,
      ip: meta.ip,
      country,
      device: ua.device,
      os: ua.os,
      browser: ua.browser,
      referrer: meta.referrer,
      utmSource: meta.utmSource,
      utmMedium: meta.utmMedium,
      utmCampaign: meta.utmCampaign,
    });

    return link.url;
  }

  async getDashboardStats(profileId: string) {
    // Return aggregated analytics from PostgreSQL
    const totalClicks = await this.db.clickEvent.count({
      where: { profileId },
    });

    const clicksByDevice = await this.db.clickEvent.groupBy({
      by: ['device'],
      where: { profileId },
      _count: {
        id: true,
      },
    });

    const clicksByCountry = await this.db.clickEvent.groupBy({
      by: ['country'],
      where: { profileId },
      _count: {
        id: true,
      },
    });

    const dailyStats = await this.db.analytics.findMany({
      where: { profileId },
      orderBy: { date: 'asc' },
    });

    return {
      totalClicks,
      clicksByDevice: clicksByDevice.map((d) => ({
        device: d.device || 'unknown',
        count: d._count.id,
      })),
      clicksByCountry: clicksByCountry.map((c) => ({
        country: c.country || 'unknown',
        count: c._count.id,
      })),
      dailyStats,
    };
  }
}
