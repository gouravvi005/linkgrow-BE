import { Controller, Get, UseGuards } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('dashboards')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly db: DatabaseService) {}

  @Get('analytic')
  async getAnalyticDashboard() {
    const totalImpressionsCount = await this.db.clickEvent.count();
    return {
      clicks: totalImpressionsCount,
      uniqueVisitors: totalImpressionsCount,
      bounceRate: 15.5,
      avgSessionDuration: 124,
    };
  }

  @Get('ecommerce')
  async getEcommerceDashboard() {
    // Query Payments for totalProfit (all SUCCESS payments)
    const successPayments = await this.db.payment.findMany({
      where: { status: 'SUCCESS' },
      orderBy: { createdAt: 'asc' },
    });

    const totalProfitVal = successPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalOrderCount = successPayments.length;

    // Query ClickEvent for totalImpression
    const totalImpressionsCount = await this.db.clickEvent.count();

    // Query Recent Orders (Payments)
    const recentPayments = await this.db.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentOrders = await Promise.all(
      recentPayments.map(async (p) => {
        const member = await this.db.workspaceMember.findFirst({
          where: { workspaceId: p.workspaceId },
          include: { user: true },
        });

        return {
          id: p.id.substring(0, 5),
          date: p.createdAt.toLocaleDateString('en-GB'),
          customer: member?.user?.name || 'Jane Doe',
          status: p.status === 'SUCCESS' ? 1 : 0,
          paymentMethod: p.provider.toLowerCase(),
          paymentIdentifier: '•••• 1234',
          totalAmount: p.amount,
        };
      })
    );

    return {
      statisticData: {
        totalProfit: {
          thisWeek: {
            value: totalProfitVal || 21827.13,
            growShrink: 11.4,
            comparePeriod: 'from last week',
            chartData: {
              series: [{ name: 'Sales', data: [24, 28, 21, 34, 30, 44, Math.round(totalProfitVal) || 25] }],
              date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          },
          thisMonth: {
            value: totalProfitVal || 82373.21,
            growShrink: 3.4,
            comparePeriod: 'from last month',
            chartData: {
              series: [{ name: 'Sales', data: [242, 334, 297, 364, 342, 431, 368, 477, 398, 489, 364, Math.round(totalProfitVal) || 571] }],
              date: ['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun', '07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun'],
            },
          },
          thisYear: {
            value: totalProfitVal || 329489.21,
            growShrink: 5.1,
            comparePeriod: 'from last month',
            chartData: {
              series: [{ name: 'Sales', data: [240, 255, 210, 275, 230, 280, 220, 340, 305, 350, 300, Math.round(totalProfitVal) || 420] }],
              date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
          },
        },
        totalOrder: {
          thisWeek: {
            value: totalOrderCount || 1782,
            growShrink: 9.2,
            comparePeriod: 'from last week',
            chartData: {
              series: [{ name: 'Orders', data: [14, 18, 12, 24, 20, 27, totalOrderCount || 16] }],
              date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          },
          thisMonth: {
            value: totalOrderCount || 7234,
            growShrink: -2.8,
            comparePeriod: 'from last month',
            chartData: {
              series: [{ name: 'Orders', data: [124, 173, 156, 183, 171, 211, 188, 244, 202, 258, 192, totalOrderCount || 271] }],
              date: ['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun', '07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun'],
            },
          },
          thisYear: {
            value: totalOrderCount || 28349,
            growShrink: 2.4,
            comparePeriod: 'from last year',
            chartData: {
              series: [{ name: 'Orders', data: [110, 118, 97, 121, 110, 137, 115, 171, 146, 167, 145, totalOrderCount || 202] }],
              date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
          },
        },
        totalImpression: {
          thisWeek: {
            value: totalImpressionsCount || 832718,
            growShrink: -5.1,
            comparePeriod: 'from last week',
            chartData: {
              series: [{ name: 'Impressions', data: [10234, 12812, 11721, 14344, 12030, 15444, totalImpressionsCount || 13225] }],
              date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          },
          thisMonth: {
            value: totalImpressionsCount || 3123734,
            growShrink: 4.6,
            comparePeriod: 'from last month',
            chartData: {
              series: [{ name: 'Impressions', data: [242124, 334097, 297364, 364342, 342431, 431368, 368477, 477398, 398489, 489364, 364571, totalImpressionsCount || 571664] }],
              date: ['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun', '07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun'],
            },
          },
          thisYear: {
            value: totalImpressionsCount || 12948921,
            growShrink: 6.3,
            comparePeriod: 'from last year',
            chartData: {
              series: [{ name: 'Impressions', data: [240110, 255123, 210097, 275121, 230110, 280137, 220115, 340171, 305146, 350167, 300145, totalImpressionsCount || 420202] }],
              date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
          },
        },
      },
      salesTarget: {
        thisWeek: { target: 400, achieved: totalOrderCount, percentage: Math.min(Math.round((totalOrderCount / 400) * 100), 100) || 65 },
        thisMonth: { target: 1750, achieved: totalOrderCount, percentage: Math.min(Math.round((totalOrderCount / 1750) * 100), 100) || 75 },
        thisYear: { target: 22000, achieved: totalOrderCount, percentage: Math.min(Math.round((totalOrderCount / 22000) * 100), 100) || 71 },
      },
      recentOrders,
      customerDemographic: {
        series: [35, 24, 18, 15, 8],
        categories: ['United States', 'India', 'United Kingdom', 'Canada', 'Others'],
      },
      revenueByChannel: [
        { name: 'Direct Link', value: totalProfitVal, percentage: 70 },
        { name: 'Social Media', value: 0, percentage: 20 },
        { name: 'Referral', value: 0, percentage: 10 },
      ],
      topProduct: [
        { id: '1', name: 'Pro Subscription', sales: totalOrderCount, amount: totalProfitVal, image: '/img/products/product-1.jpg' },
      ],
    };
  }

  @Get('marketing')
  getMarketingDashboard() {
    return {
      campaignsActive: 2,
      leadsGenerated: 145,
      conversionRate: 3.2,
    };
  }

  @Get('project')
  getProjectDashboard() {
    return {
      tasksCompleted: 12,
      tasksPending: 4,
      teamMembers: 1,
    };
  }
}
