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
var EmailWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
const email_templates_1 = require("../email/email-templates");
const common_1 = require("@nestjs/common");
let EmailWorker = EmailWorker_1 = class EmailWorker extends bullmq_1.WorkerHost {
    config;
    logger = new common_1.Logger(EmailWorker_1.name);
    resend;
    fromEmail;
    constructor(config) {
        super();
        this.config = config;
        const apiKey = this.config.get('RESEND_API_KEY') || 'mock';
        this.resend = new resend_1.Resend(apiKey);
        this.fromEmail = this.config.get('EMAIL_FROM') || 'noreply@linkgrow.com';
    }
    async process(job) {
        const { to, templateName, context } = job.data;
        this.logger.log(`Processing email job for: ${to}, template: ${templateName}`);
        const { subject, html } = (0, email_templates_1.getEmailTemplate)(templateName, context);
        try {
            if (this.config.get('NODE_ENV') === 'test' || this.config.get('RESEND_API_KEY') === 're_mock_api_key_for_development') {
                this.logger.log(`Mocking Email Sending: To=${to}, Subject="${subject}"`);
                return;
            }
            await this.resend.emails.send({
                from: this.fromEmail,
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent successfully to ${to}`);
        }
        catch (err) {
            this.logger.error(`Failed to send email to ${to}: ${err.message}`);
            throw err;
        }
    }
};
exports.EmailWorker = EmailWorker;
exports.EmailWorker = EmailWorker = EmailWorker_1 = __decorate([
    (0, bullmq_1.Processor)('email-processing'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailWorker);
//# sourceMappingURL=email.worker.js.map