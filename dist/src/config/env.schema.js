"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_URL: zod_1.z.string().url().optional(),
    BETTER_AUTH_SECRET: zod_1.z.string().min(16),
    BETTER_AUTH_URL: zod_1.z.string().url(),
    RESEND_API_KEY: zod_1.z.string().min(1),
    EMAIL_FROM: zod_1.z.string().email(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: zod_1.z.string().min(1),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: zod_1.z.string().min(1),
    CLOUDFLARE_R2_BUCKET_NAME: zod_1.z.string().min(1),
    CLOUDFLARE_R2_ENDPOINT: zod_1.z.string().url(),
    CLOUDFLARE_R2_PUBLIC_URL: zod_1.z.string().url(),
    STRIPE_SECRET_KEY: zod_1.z.string().min(1),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string().min(1),
    RAZORPAY_KEY_ID: zod_1.z.string().min(1),
    RAZORPAY_KEY_SECRET: zod_1.z.string().min(1),
    RAZORPAY_WEBHOOK_SECRET: zod_1.z.string().min(1),
    WHATSAPP_PHONE_NUMBER_ID: zod_1.z.string().optional(),
    WHATSAPP_ACCESS_TOKEN: zod_1.z.string().optional(),
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: zod_1.z.string().optional(),
});
//# sourceMappingURL=env.schema.js.map