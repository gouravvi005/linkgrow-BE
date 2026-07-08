"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundWebhookService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let OutboundWebhookService = class OutboundWebhookService {
    db;
    webhookQueue;
    constructor(db, webhookQueue) {
        this.db = db;
        this.webhookQueue = webhookQueue;
    }
    async triggerEvent(workspaceId, eventType, payload) {
        const webhooks = await this.db.webhook.findMany({
            where: {
                workspaceId,
                isActive: true,
                deletedAt: null,
            },
        });
        for (const hook of webhooks) {
            const configuredEvents = hook.events;
            if (configuredEvents.includes(eventType) || configuredEvents.includes('*')) {
                await this.webhookQueue.add('send-webhook', {
                    webhookId: hook.id,
                    url: hook.url,
                    secret: hook.secret,
                    eventType,
                    payload,
                });
            }
        }
    }
};
exports.OutboundWebhookService = OutboundWebhookService;
exports.OutboundWebhookService = OutboundWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('webhook-processing')),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        bullmq_2.Queue])
], OutboundWebhookService);
//# sourceMappingURL=outbound-webhook.service.js.map