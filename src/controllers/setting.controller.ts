import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('setting')
@UseGuards(AuthGuard)
export class SettingController {
  constructor(private readonly db: DatabaseService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    const user = req.user;
    const dbUser = await this.db.user.findUnique({
      where: { id: user.id },
    });
    return {
      id: dbUser?.id,
      name: dbUser?.name,
      userName: dbUser?.username || dbUser?.name,
      email: dbUser?.email,
      phone: dbUser?.phone || '',
      avatar: dbUser?.avatar || dbUser?.image || '',
      status: dbUser?.status || 'active',
      role: dbUser?.role || 'user',
      subscription: dbUser?.subscription || 'free',
    };
  }

  @Get('notification')
  getNotification() {
    return {
      emailSubscription: true,
      desktopNotification: true,
      activityUpdate: false,
    };
  }

  @Get('billing')
  async getBilling(@Req() req: any) {
    const user = req.user;
    const member = await this.db.workspaceMember.findFirst({
      where: { userId: user.id },
      include: { workspace: { include: { subscriptions: true } } },
    });

    const activeSub = member?.workspace?.subscriptions?.[0];
    return {
      paymentMethod: 'Stripe',
      cardType: 'Visa',
      lastFourDigits: '1234',
      status: activeSub?.status || 'INACTIVE',
      planName: activeSub ? 'Pro Plan' : 'Free Plan',
      currentPeriodEnd: activeSub?.currentPeriodEnd || new Date(),
    };
  }

  @Get('intergration')
  getIntergration() {
    return [];
  }

  @Get('integration')
  getIntegration() {
    return [];
  }
}
