"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("./config/config.module");
const logger_module_1 = require("./common/logger/logger.module");
const database_module_1 = require("./database/database.module");
const cache_module_1 = require("./cache/cache.module");
const queue_module_1 = require("./queue/queue.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const profiles_module_1 = require("./profiles/profiles.module");
const links_module_1 = require("./links/links.module");
const analytics_module_1 = require("./analytics/analytics.module");
const storage_module_1 = require("./storage/storage.module");
const media_module_1 = require("./media/media.module");
const email_module_1 = require("./email/email.module");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const payments_module_1 = require("./payments/payments.module");
const health_module_1 = require("./health/health.module");
const admin_module_1 = require("./admin/admin.module");
const rate_limit_guard_1 = require("./common/guards/rate-limit.guard");
const xss_middleware_1 = require("./common/middleware/xss.middleware");
const auth_controller_1 = require("./controllers/auth.controller");
const customers_controller_1 = require("./controllers/customers.controller");
const products_controller_1 = require("./controllers/products.controller");
const projects_controller_1 = require("./controllers/projects.controller");
const setting_controller_1 = require("./controllers/setting.controller");
const ai_controller_1 = require("./controllers/ai.controller");
const chat_controller_1 = require("./controllers/chat.controller");
const common_controller_1 = require("./controllers/common.controller");
const file_controller_1 = require("./controllers/file.controller");
const helpcenter_controller_1 = require("./controllers/helpcenter.controller");
const log_controller_1 = require("./controllers/log.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const orders_controller_1 = require("./controllers/orders.controller");
const mail_controller_1 = require("./controllers/mail.controller");
const calendar_controller_1 = require("./controllers/calendar.controller");
const pricing_controller_1 = require("./controllers/pricing.controller");
const roles_controller_1 = require("./controllers/roles.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(xss_middleware_1.XssMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            logger_module_1.LoggerModule,
            database_module_1.DatabaseModule,
            cache_module_1.CacheModule,
            queue_module_1.QueueModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            profiles_module_1.ProfilesModule,
            links_module_1.LinksModule,
            analytics_module_1.AnalyticsModule,
            storage_module_1.StorageModule,
            media_module_1.MediaModule,
            email_module_1.EmailModule,
            whatsapp_module_1.WhatsappModule,
            payments_module_1.PaymentsModule,
            health_module_1.HealthModule,
            admin_module_1.AdminModule,
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            customers_controller_1.CustomersController,
            products_controller_1.ProductsController,
            projects_controller_1.ProjectsController,
            setting_controller_1.SettingController,
            ai_controller_1.AiController,
            chat_controller_1.ChatController,
            common_controller_1.CommonController,
            file_controller_1.FileController,
            helpcenter_controller_1.HelpCenterController,
            log_controller_1.LogController,
            dashboard_controller_1.DashboardController,
            orders_controller_1.OrdersController,
            mail_controller_1.MailController,
            calendar_controller_1.CalendarController,
            pricing_controller_1.PricingController,
            roles_controller_1.RolesController,
        ],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: rate_limit_guard_1.RateLimitGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map