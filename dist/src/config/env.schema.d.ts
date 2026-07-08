import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodString;
    REDIS_URL: z.ZodOptional<z.ZodString>;
    BETTER_AUTH_SECRET: z.ZodString;
    BETTER_AUTH_URL: z.ZodString;
    RESEND_API_KEY: z.ZodString;
    EMAIL_FROM: z.ZodString;
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.ZodString;
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.ZodString;
    CLOUDFLARE_R2_BUCKET_NAME: z.ZodString;
    CLOUDFLARE_R2_ENDPOINT: z.ZodString;
    CLOUDFLARE_R2_PUBLIC_URL: z.ZodString;
    STRIPE_SECRET_KEY: z.ZodString;
    STRIPE_WEBHOOK_SECRET: z.ZodString;
    RAZORPAY_KEY_ID: z.ZodString;
    RAZORPAY_KEY_SECRET: z.ZodString;
    RAZORPAY_WEBHOOK_SECRET: z.ZodString;
    WHATSAPP_PHONE_NUMBER_ID: z.ZodOptional<z.ZodString>;
    WHATSAPP_ACCESS_TOKEN: z.ZodOptional<z.ZodString>;
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
