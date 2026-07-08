import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@/config/config.module';
import { LoggerModule } from '@/common/logger/logger.module';
import { DatabaseModule } from '@/database/database.module';
import { CacheModule } from '@/cache/cache.module';
import { QueueModule } from '@/queue/queue.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { ProfilesModule } from '@/profiles/profiles.module';
import { LinksModule } from '@/links/links.module';
import { AnalyticsModule } from '@/analytics/analytics.module';
import { StorageModule } from '@/storage/storage.module';
import { MediaModule } from '@/media/media.module';
import { EmailModule } from '@/email/email.module';
import { WhatsappModule } from '@/whatsapp/whatsapp.module';
import { PaymentsModule } from '@/payments/payments.module';
import { HealthModule } from '@/health/health.module';
import { AdminModule } from '@/admin/admin.module';
import { RateLimitGuard } from '@/common/guards/rate-limit.guard';
import { XssMiddleware } from '@/common/middleware/xss.middleware';

// Mock Controllers for Frontend
import { AuthController } from './controllers/auth.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsController } from './controllers/products.controller';
import { ProjectsController } from './controllers/projects.controller';
import { SettingController } from './controllers/setting.controller';
import { AiController } from './controllers/ai.controller';
import { ChatController } from './controllers/chat.controller';
import { CommonController } from './controllers/common.controller';
import { FileController } from './controllers/file.controller';
import { HelpCenterController } from './controllers/helpcenter.controller';
import { LogController } from './controllers/log.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { OrdersController } from './controllers/orders.controller';
import { MailController } from './controllers/mail.controller';
import { CalendarController } from './controllers/calendar.controller';
import { PricingController } from './controllers/pricing.controller';
import { RolesController } from './controllers/roles.controller';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    CacheModule,
    QueueModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    LinksModule,
    AnalyticsModule,
    StorageModule,
    MediaModule,
    EmailModule,
    WhatsappModule,
    PaymentsModule,
    HealthModule,
    AdminModule,
  ],
  controllers: [
    AppController,
    AuthController,
    CustomersController,
    ProductsController,
    ProjectsController,
    SettingController,
    AiController,
    ChatController,
    CommonController,
    FileController,
    HelpCenterController,
    LogController,
    DashboardController,
    OrdersController,
    MailController,
    CalendarController,
    PricingController,
    RolesController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XssMiddleware).forRoutes('*');
  }
}
