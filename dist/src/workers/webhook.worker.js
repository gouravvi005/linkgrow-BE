"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhookWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const crypto = __importStar(require("crypto"));
let WebhookWorker = WebhookWorker_1 = class WebhookWorker extends bullmq_1.WorkerHost {
    httpService;
    logger = new common_1.Logger(WebhookWorker_1.name);
    constructor(httpService) {
        super();
        this.httpService = httpService;
    }
    async process(job) {
        const { webhookId, url, secret, eventType, payload } = job.data;
        this.logger.log(`Processing outbound webhook: ${webhookId} to ${url} for event: ${eventType}`);
        const timestamp = Date.now().toString();
        const body = {
            event: eventType,
            payload,
            timestamp,
        };
        const signature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(body))
            .digest('hex');
        try {
            await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Linkgrow-Signature': signature,
                    'X-Linkgrow-Timestamp': timestamp,
                },
                timeout: 5000,
            }));
            this.logger.log(`Webhook delivery succeeded for hook: ${webhookId}`);
        }
        catch (err) {
            const errMsg = err.response?.data || err.message;
            this.logger.error(`Webhook delivery failed for hook: ${webhookId}. Error: ${errMsg}`);
            throw err;
        }
    }
};
exports.WebhookWorker = WebhookWorker;
exports.WebhookWorker = WebhookWorker = WebhookWorker_1 = __decorate([
    (0, bullmq_1.Processor)('webhook-processing'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WebhookWorker);
//# sourceMappingURL=webhook.worker.js.map