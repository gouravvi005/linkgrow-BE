"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const axios_1 = require("@nestjs/axios");
const outbound_webhook_service_1 = require("./outbound-webhook.service");
const admin_controller_1 = require("./admin.controller");
const webhook_worker_1 = require("../workers/webhook.worker");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            bullmq_1.BullModule.registerQueue({
                name: 'webhook-processing',
            }),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [outbound_webhook_service_1.OutboundWebhookService, webhook_worker_1.WebhookWorker],
        exports: [outbound_webhook_service_1.OutboundWebhookService, bullmq_1.BullModule],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map