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
var WhatsappWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let WhatsappWorker = WhatsappWorker_1 = class WhatsappWorker extends bullmq_1.WorkerHost {
    config;
    httpService;
    logger = new common_1.Logger(WhatsappWorker_1.name);
    constructor(config, httpService) {
        super();
        this.config = config;
        this.httpService = httpService;
    }
    async process(job) {
        const { to, templateName, variables } = job.data;
        this.logger.log(`Processing WhatsApp message to: ${to}, template: ${templateName}`);
        const phoneId = this.config.get('WHATSAPP_PHONE_NUMBER_ID');
        const token = this.config.get('WHATSAPP_ACCESS_TOKEN');
        if (!phoneId || !token) {
            this.logger.log(`Mocking WhatsApp Notification to ${to}: Template=${templateName}, Params=${variables.join(',')}`);
            return;
        }
        const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'body',
                        parameters: variables.map((v) => ({
                            type: 'text',
                            text: v,
                        })),
                    },
                ],
            },
        };
        try {
            await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }));
            this.logger.log(`WhatsApp message sent successfully to ${to}`);
        }
        catch (err) {
            const errMsg = err.response?.data?.error?.message || err.message;
            this.logger.error(`Failed to send WhatsApp message to ${to}: ${errMsg}`);
            throw err;
        }
    }
};
exports.WhatsappWorker = WhatsappWorker;
exports.WhatsappWorker = WhatsappWorker = WhatsappWorker_1 = __decorate([
    (0, bullmq_1.Processor)('whatsapp-processing'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], WhatsappWorker);
//# sourceMappingURL=whatsapp.worker.js.map