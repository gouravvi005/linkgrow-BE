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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const active_workspace_decorator_1 = require("../auth/decorators/active-workspace.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const payments_service_1 = require("./payments.service");
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    planId: zod_1.z.string().uuid(),
    provider: zod_1.z.enum(['stripe', 'razorpay']),
    successUrl: zod_1.z.string().url().optional(),
    cancelUrl: zod_1.z.string().url().optional(),
});
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async createOrder(workspaceId, body) {
        if (body.provider === 'stripe') {
            const successUrl = body.successUrl || 'http://localhost:3000/success';
            const cancelUrl = body.cancelUrl || 'http://localhost:3000/cancel';
            return this.paymentsService.createStripeCheckout(workspaceId, body.planId, successUrl, cancelUrl);
        }
        else {
            return this.paymentsService.createRazorpayOrder(workspaceId, body.planId);
        }
    }
    async stripeWebhook(req, signature) {
        if (!signature) {
            throw new common_1.BadRequestException('Missing stripe signature header');
        }
        const rawBody = req.rawBody;
        if (!rawBody) {
            throw new common_1.BadRequestException('Raw request body is missing');
        }
        return this.paymentsService.handleStripeWebhook(rawBody, signature);
    }
    async razorpayWebhook(req, signature) {
        if (!signature) {
            throw new common_1.BadRequestException('Missing razorpay signature header');
        }
        return this.paymentsService.handleRazorpayWebhook(req.body, signature);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('payments/create-order'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(createOrderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('webhooks/stripe'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "stripeWebhook", null);
__decorate([
    (0, common_1.Post)('webhooks/razorpay'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('x-razorpay-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "razorpayWebhook", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map