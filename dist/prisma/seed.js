"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("better-auth/crypto");
const pg_1 = __importDefault(require("pg"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/linkgrow?schema=public";
const pool = new pg_1.default.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Clearing database tables...');
    await prisma.analytics.deleteMany().catch(() => { });
    await prisma.clickEvent.deleteMany().catch(() => { });
    await prisma.socialLink.deleteMany().catch(() => { });
    await prisma.link.deleteMany().catch(() => { });
    await prisma.category.deleteMany().catch(() => { });
    await prisma.profile.deleteMany().catch(() => { });
    await prisma.webhook.deleteMany().catch(() => { });
    await prisma.auditLog.deleteMany().catch(() => { });
    await prisma.aPIKey.deleteMany().catch(() => { });
    await prisma.media.deleteMany().catch(() => { });
    await prisma.customDomain.deleteMany().catch(() => { });
    await prisma.qRCode.deleteMany().catch(() => { });
    await prisma.transaction.deleteMany().catch(() => { });
    await prisma.payment.deleteMany().catch(() => { });
    await prisma.subscription.deleteMany().catch(() => { });
    await prisma.plan.deleteMany().catch(() => { });
    await prisma.workspaceMember.deleteMany().catch(() => { });
    await prisma.rolePermission.deleteMany().catch(() => { });
    await prisma.permission.deleteMany().catch(() => { });
    await prisma.role.deleteMany().catch(() => { });
    await prisma.session.deleteMany().catch(() => { });
    await prisma.account.deleteMany().catch(() => { });
    await prisma.notification.deleteMany().catch(() => { });
    await prisma.user.deleteMany().catch(() => { });
    console.log('Seeding Plans...');
    const planFree = await prisma.plan.create({
        data: {
            name: 'Free Plan',
            code: 'free',
            description: 'Perfect for starters',
            priceMonthly: 0,
            priceYearly: 0,
            currency: 'USD',
            features: {},
        },
    });
    const planPro = await prisma.plan.create({
        data: {
            name: 'Pro Plan',
            code: 'pro',
            description: 'For growing creators',
            priceMonthly: 19,
            priceYearly: 190,
            currency: 'USD',
            stripePriceId: 'price_pro_monthly',
            features: {},
        },
    });
    await prisma.plan.create({
        data: {
            name: 'Enterprise Plan',
            code: 'enterprise',
            description: 'For large businesses',
            priceMonthly: 99,
            priceYearly: 990,
            currency: 'USD',
            stripePriceId: 'price_ent_monthly',
            features: {},
        },
    });
    console.log('Seeding Roles...');
    const roleSuperAdmin = await prisma.role.create({
        data: {
            name: 'SUPERADMIN',
            description: 'Platform Super Administrator',
        },
    });
    const roleAdmin = await prisma.role.create({
        data: {
            name: 'ADMIN',
            description: 'Workspace Administrator',
        },
    });
    const roleUser = await prisma.role.create({
        data: {
            name: 'USER',
            description: 'Standard Workspace User',
        },
    });
    const roleOwner = await prisma.role.create({
        data: {
            name: 'OWNER',
            description: 'Workspace Owner',
        },
    });
    console.log('Hashing passwords...');
    const hashedDefaultPassword = await (0, crypto_1.hashPassword)('123Qwe');
    console.log('Seeding Users...');
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin One',
            email: 'admin-01@ecme.com',
            username: 'admin01',
            emailVerified: true,
            phone: '+1234567890',
            password: hashedDefaultPassword,
            provider: 'credentials',
            role: 'admin',
            subscription: 'pro',
            avatar: '/img/avatars/thumb-1.jpg',
            status: 'active',
            lastLogin: new Date(),
        },
    });
    await prisma.account.create({
        data: {
            userId: adminUser.id,
            providerId: 'email',
            accountId: adminUser.email,
            password: hashedDefaultPassword,
        },
    });
    const regularUser = await prisma.user.create({
        data: {
            name: 'User One',
            email: 'user-01@ecme.com',
            username: 'user01',
            emailVerified: true,
            phone: '+1987654321',
            password: hashedDefaultPassword,
            provider: 'credentials',
            role: 'user',
            subscription: 'free',
            avatar: '/img/avatars/thumb-2.jpg',
            status: 'active',
            lastLogin: new Date(),
        },
    });
    await prisma.account.create({
        data: {
            userId: regularUser.id,
            providerId: 'email',
            accountId: regularUser.email,
            password: hashedDefaultPassword,
        },
    });
    console.log('Seeding Workspace...');
    const adminWorkspace = await prisma.workspace.create({
        data: {
            name: "Admin's Space",
            slug: 'admins-space',
        },
    });
    await prisma.workspaceMember.create({
        data: {
            workspaceId: adminWorkspace.id,
            userId: adminUser.id,
            roleId: roleOwner.id,
        },
    });
    console.log('Seeding Subscription...');
    const subscription = await prisma.subscription.create({
        data: {
            workspaceId: adminWorkspace.id,
            planId: planPro.id,
            status: 'ACTIVE',
            provider: 'STRIPE',
            providerSubscriptionId: 'sub_mock_12345',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });
    console.log('Seeding Payments...');
    await prisma.payment.create({
        data: {
            workspaceId: adminWorkspace.id,
            subscriptionId: subscription.id,
            amount: 19.00,
            currency: 'USD',
            status: 'SUCCESS',
            provider: 'STRIPE',
            providerPaymentId: 'ch_mock_1',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
    });
    await prisma.payment.create({
        data: {
            workspaceId: adminWorkspace.id,
            subscriptionId: subscription.id,
            amount: 19.00,
            currency: 'USD',
            status: 'SUCCESS',
            provider: 'STRIPE',
            providerPaymentId: 'ch_mock_2',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
    });
    console.log('Seeding Profiles and Links...');
    const profile = await prisma.profile.create({
        data: {
            workspaceId: adminWorkspace.id,
            username: 'admin01',
            title: 'Admin Portfolio',
            bio: 'Welcome to my links page.',
            isPublished: true,
            avatarUrl: '/img/avatars/thumb-1.jpg',
        },
    });
    const category = await prisma.category.create({
        data: {
            profileId: profile.id,
            name: 'Main Links',
            sortOrder: 0,
        },
    });
    await prisma.link.create({
        data: {
            profileId: profile.id,
            categoryId: category.id,
            title: 'My GitHub Profile',
            url: 'https://github.com',
            sortOrder: 0,
        },
    });
    await prisma.link.create({
        data: {
            profileId: profile.id,
            categoryId: category.id,
            title: 'Follow me on Twitter',
            url: 'https://twitter.com',
            sortOrder: 1,
        },
    });
    console.log('Seeding ClickEvents & Analytics...');
    await prisma.clickEvent.create({
        data: {
            profileId: profile.id,
            visitorId: 'visitor_a',
            country: 'US',
            device: 'Desktop',
            browser: 'Chrome',
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        },
    });
    await prisma.clickEvent.create({
        data: {
            profileId: profile.id,
            visitorId: 'visitor_b',
            country: 'IN',
            device: 'Mobile',
            browser: 'Safari',
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        },
    });
    await prisma.analytics.create({
        data: {
            profileId: profile.id,
            date: new Date(),
            clicksCount: 2,
            visitorsCount: 2,
            countryCode: 'US',
            deviceType: 'Desktop',
        },
    });
    console.log('Seeding Notifications...');
    await prisma.notification.create({
        data: {
            userId: adminUser.id,
            title: 'Welcome to LinkGrow!',
            message: 'Your account is ready. Claim your handle to start sharing.',
            type: 'IN_APP',
        },
    });
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map