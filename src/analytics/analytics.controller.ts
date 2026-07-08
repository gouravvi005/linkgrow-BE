import { Controller, Get, Param, Req, Res, Query, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { DatabaseService } from '@/database/database.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly db: DatabaseService,
  ) {}

  @Get('click/:linkId')
  async redirectLink(
    @Param('linkId') linkId: string,
    @Req() req: Request,
    @Res() res: Response,
    @Query('utm_source') utmSource?: string,
    @Query('utm_medium') utmMedium?: string,
    @Query('utm_campaign') utmCampaign?: string,
  ) {
    const ipRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ip = Array.isArray(ipRaw) ? ipRaw[0] : (ipRaw as string).split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || '';
    
    // Cookie support or generate mock visitorId
    const visitorId = req.cookies?.['visitor_id'] || 'visitor_' + Math.random().toString(36).substring(2, 15);

    const redirectUrl = await this.analyticsService.trackClick(linkId, {
      visitorId,
      ip,
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    if (!redirectUrl) {
      return res.status(404).send('Link not found');
    }

    res.cookie('visitor_id', visitorId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
    return res.redirect(302, redirectUrl);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getDashboard(@ActiveWorkspaceId() workspaceId: string) {
    const profile = await this.db.profile.findFirst({
      where: { workspaceId, deletedAt: null },
    });
    
    if (!profile) {
      return {
        totalClicks: 0,
        clicksByDevice: [],
        clicksByCountry: [],
        dailyStats: [],
      };
    }

    return this.analyticsService.getDashboardStats(profile.id);
  }
}
