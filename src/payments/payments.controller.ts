import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { PaymentsService } from './payments.service';
import { z } from 'zod';

const createOrderSchema = z.object({
  planId: z.string().uuid(),
  provider: z.enum(['stripe', 'razorpay']),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

type CreateOrderDto = z.infer<typeof createOrderSchema>;

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('payments/create-order')
  @UseGuards(AuthGuard)
  async createOrder(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderDto,
  ) {
    if (body.provider === 'stripe') {
      const successUrl = body.successUrl || 'http://localhost:3000/success';
      const cancelUrl = body.cancelUrl || 'http://localhost:3000/cancel';
      return this.paymentsService.createStripeCheckout(
        workspaceId,
        body.planId,
        successUrl,
        cancelUrl,
      );
    } else {
      return this.paymentsService.createRazorpayOrder(workspaceId, body.planId);
    }
  }

  @Post('webhooks/stripe')
  async stripeWebhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
    if (!signature) {
      throw new BadRequestException('Missing stripe signature header');
    }
    // We retrieve the raw request body buffer saved in main.ts
    const rawBody = (req as any).rawBody;
    if (!rawBody) {
      throw new BadRequestException('Raw request body is missing');
    }
    return this.paymentsService.handleStripeWebhook(rawBody, signature);
  }

  @Post('webhooks/razorpay')
  async razorpayWebhook(
    @Req() req: Request,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing razorpay signature header');
    }
    return this.paymentsService.handleRazorpayWebhook(req.body, signature);
  }
}
