import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@/database/database.service';
import { EmailService } from '@/email/email.service';
import { WhatsappService } from '@/whatsapp/whatsapp.service';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe;
  private razorpay: Razorpay;

  constructor(
    private readonly config: ConfigService,
    private readonly db: DatabaseService,
    private readonly email: EmailService,
    private readonly whatsapp: WhatsappService,
  ) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY') || 'mock_key', {
      apiVersion: '2025-01-27.acacia' as any,
    });
    this.razorpay = new Razorpay({
      key_id: this.config.get<string>('RAZORPAY_KEY_ID') || 'mock_key',
      key_secret: this.config.get<string>('RAZORPAY_KEY_SECRET') || 'mock_secret',
    });
  }

  // --- Checkout session creation ---
  async createStripeCheckout(workspaceId: string, planId: string, successUrl: string, cancelUrl: string) {
    const plan = await this.db.plan.findUnique({ where: { id: planId } });
    if (!plan || !plan.stripePriceId) {
      throw new NotFoundException('Plan or Stripe Price ID not configured');
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

  async createRazorpayOrder(workspaceId: string, planId: string) {
    const plan = await this.db.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    // Creating subscription order in Razorpay
    const subscription = await this.razorpay.subscriptions.create({
      plan_id: plan.razorpayPlanId || 'mock_plan_id',
      customer_notify: 1,
      total_count: 12, // 1 year monthly
      notes: { workspaceId, planId },
    } as any);

    return {
      subscriptionId: subscription.id,
      keyId: this.config.get<string>('RAZORPAY_KEY_ID'),
    };
  }

  // --- Webhooks processing ---
  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET') || '';
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      this.logger.error(`Stripe Webhook Signature Verification Failed: ${err.message}`);
      throw new BadRequestException('Webhook signature verification failed');
    }

    this.logger.log(`Received Stripe Webhook event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const workspaceId = session.metadata?.workspaceId;
      const planId = session.metadata?.planId;

      if (workspaceId && planId && session.subscription) {
        await this.activateSubscription(
          workspaceId,
          planId,
          session.subscription as string,
          'STRIPE',
          session.amount_total ? session.amount_total / 100 : 0,
        );
      }
    }

    return { received: true };
  }

  async handleRazorpayWebhook(body: any, signature: string) {
    const webhookSecret = this.config.get<string>('RAZORPAY_WEBHOOK_SECRET') || '';
    const hash = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (hash !== signature) {
      this.logger.error('Razorpay Webhook Signature Verification Failed');
      throw new BadRequestException('Webhook signature verification failed');
    }

    const event = body.event;
    this.logger.log(`Received Razorpay Webhook event: ${event}`);

    if (event === 'subscription.activated') {
      const payload = body.payload.subscription.entity;
      const workspaceId = payload.notes?.workspaceId;
      const planId = payload.notes?.planId;

      if (workspaceId && planId) {
        await this.activateSubscription(
          workspaceId,
          planId,
          payload.id,
          'RAZORPAY',
          payload.charge_amount ? payload.charge_amount / 100 : 0,
        );
      }
    }

    return { received: true };
  }

  // --- Helper to update DB state ---
  private async activateSubscription(
    workspaceId: string,
    planId: string,
    subId: string,
    provider: 'STRIPE' | 'RAZORPAY',
    amount: number,
  ) {
    const workspace = await this.db.workspace.findUnique({
      where: { id: workspaceId },
      include: { members: { include: { user: true, role: true } } },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const ownerMember = workspace.members.find((m) => m.role.name === 'OWNER');
    const ownerEmail = ownerMember?.user.email || '';
    const ownerName = ownerMember?.user.name || 'Workspace Owner';

    await this.db.$transaction(async (tx) => {
      // 1. Create or update subscription
      const subscription = await tx.subscription.upsert({
        where: { providerSubscriptionId: subId },
        create: {
          workspaceId,
          planId,
          status: 'ACTIVE',
          provider,
          providerSubscriptionId: subId,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        },
        update: {
          status: 'ACTIVE',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      // 2. Create Payment Record
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

      // 3. Create Transaction Ledger entry
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

    // 4. Send Confirmation Emails & WhatsApp alerts asynchronously
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
}
