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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_service_1 = require("../database/database.service");
const email_service_1 = require("../email/email.service");
const whatsapp_service_1 = require("../whatsapp/whatsapp.service");
const stripe_1 = __importDefault(require("stripe"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto = __importStar(require("crypto"));
let PaymentsService = PaymentsService_1 = class PaymentsService {
    config;
    db;
    email;
    whatsapp;
    logger = new common_1.Logger(PaymentsService_1.name);
    stripe;
    razorpay;
    constructor(config, db, email, whatsapp) {
        this.config = config;
        this.db = db;
        this.email = email;
        this.whatsapp = whatsapp;
        this.stripe = new stripe_1.default(this.config.get('STRIPE_SECRET_KEY') || 'mock_key', {
            apiVersion: '2025-01-27.acacia',
        });
        this.razorpay = new razorpay_1.default({
            key_id: this.config.get('RAZORPAY_KEY_ID') || 'mock_key',
            key_secret: this.config.get('RAZORPAY_KEY_SECRET') || 'mock_secret',
        });
    }
    async createStripeCheckout(workspaceId, planId, successUrl, cancelUrl) {
        const plan = await this.db.plan.findUnique({ where: { id: planId } });
        if (!plan || !plan.stripePriceId) {
            throw new common_1.NotFoundException('Plan or Stripe Price ID not configured');
        }
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: plan.stripePriceId, quantity: 1 }],
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: { workspaceId, planId },
        });
        return { url: session.url };
    }
    async createRazorpayOrder(workspaceId, planId) {
        const plan = await this.db.plan.findUnique({ where: { id: planId } });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        const subscription = await this.razorpay.subscriptions.create({
            plan_id: plan.razorpayPlanId || 'mock_plan_id',
            customer_notify: 1,
            total_count: 12,
            notes: { workspaceId, planId },
        });
        return {
            subscriptionId: subscription.id,
            keyId: this.config.get('RAZORPAY_KEY_ID'),
        };
    }
    async handleStripeWebhook(rawBody, signature) {
        const webhookSecret = this.config.get('STRIPE_WEBHOOK_SECRET') || '';
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        }
        catch (err) {
            this.logger.error(`Stripe Webhook Signature Verification Failed: ${err.message}`);
            throw new common_1.BadRequestException('Webhook signature verification failed');
        }
        this.logger.log(`Received Stripe Webhook event: ${event.type}`);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const workspaceId = session.metadata?.workspaceId;
            const planId = session.metadata?.planId;
            if (workspaceId && planId && session.subscription) {
                await this.activateSubscription(workspaceId, planId, session.subscription, 'STRIPE', session.amount_total ? session.amount_total / 100 : 0);
            }
        }
        return { received: true };
    }
    async handleRazorpayWebhook(body, signature) {
        const webhookSecret = this.config.get('RAZORPAY_WEBHOOK_SECRET') || '';
        const hash = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(body))
            .digest('hex');
        if (hash !== signature) {
            this.logger.error('Razorpay Webhook Signature Verification Failed');
            throw new common_1.BadRequestException('Webhook signature verification failed');
        }
        const event = body.event;
        this.logger.log(`Received Razorpay Webhook event: ${event}`);
        if (event === 'subscription.activated') {
            const payload = body.payload.subscription.entity;
            const workspaceId = payload.notes?.workspaceId;
            const planId = payload.notes?.planId;
            if (workspaceId && planId) {
                await this.activateSubscription(workspaceId, planId, payload.id, 'RAZORPAY', payload.charge_amount ? payload.charge_amount / 100 : 0);
            }
        }
        return { received: true };
    }
    async activateSubscription(workspaceId, planId, subId, provider, amount) {
        const workspace = await this.db.workspace.findUnique({
            where: { id: workspaceId },
            include: { members: { include: { user: true, role: true } } },
        });
        if (!workspace) {
            throw new common_1.NotFoundException('Workspace not found');
        }
        const ownerMember = workspace.members.find((m) => m.role.name === 'OWNER');
        const ownerEmail = ownerMember?.user.email || '';
        const ownerName = ownerMember?.user.name || 'Workspace Owner';
        await this.db.$transaction(async (tx) => {
            const subscription = await tx.subscription.upsert({
                where: { providerSubscriptionId: subId },
                create: {
                    workspaceId,
                    planId,
                    status: 'ACTIVE',
                    provider,
                    providerSubscriptionId: subId,
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
                update: {
                    status: 'ACTIVE',
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            });
            const payment = await tx.payment.create({
                data: {
                    workspaceId,
                    subscriptionId: subscription.id,
                    amount,
                    currency: 'USD',
                    status: 'SUCCESS',
                    provider,
                    providerPaymentId: `pay_${provider.toLowerCase()}_${Date.now()}`,
                },
            });
            await tx.transaction.create({
                data: {
                    workspaceId,
                    paymentId: payment.id,
                    type: 'CHARGE',
                    amount,
                    status: 'SUCCESS',
                },
            });
        });
        if (ownerEmail) {
            await this.email.sendEmail(ownerEmail, 'subscription', {
                name: ownerName,
            });
            await this.email.sendEmail(ownerEmail, 'invoice', {
                name: ownerName,
                amount,
                currency: 'USD',
                transactionId: `pay_${provider.toLowerCase()}_${Date.now()}`,
            });
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        database_service_1.DatabaseService,
        email_service_1.EmailService,
        whatsapp_service_1.WhatsappService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map