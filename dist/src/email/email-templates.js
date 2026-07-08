"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailTemplate = getEmailTemplate;
function getEmailTemplate(templateName, context) {
    switch (templateName) {
        case 'welcome':
            return {
                subject: `Welcome to Linkgrow, ${context.name}!`,
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">Welcome to Linkgrow</h2>
            <p>Hi ${context.name},</p>
            <p>Thank you for signing up! We're excited to help you grow your audience and build a premium digital brand.</p>
            <p>Log in to your dashboard to customize your links and profile layout.</p>
            <a href="${context.loginUrl}" style="background: #4F46E5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">Go to Dashboard</a>
          </div>
        `,
            };
        case 'verification':
            return {
                subject: 'Verify your Linkgrow email address',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">Email Verification</h2>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${context.verifyUrl}" style="background: #4F46E5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">Verify Email</a>
          </div>
        `,
            };
        case 'password-reset':
            return {
                subject: 'Reset your Linkgrow password',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">Password Reset Request</h2>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <a href="${context.resetUrl}" style="background: #E11D48; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">Reset Password</a>
            <p style="font-size: 12px; color: #666; margin-top: 15px;">If you did not request this, you can safely ignore this email.</p>
          </div>
        `,
            };
        case 'subscription':
            return {
                subject: 'Your Linkgrow Pro Subscription is Active!',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #10B981;">Subscription Confirmed</h2>
            <p>Thank you for subscribing to Linkgrow Pro!</p>
            <p>You now have access to premium layout themes, custom domains, and real-time deep analytics.</p>
          </div>
        `,
            };
        case 'invoice':
            return {
                subject: 'Your Linkgrow Invoice',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">Invoice Receipt</h2>
            <p>Hi ${context.name},</p>
            <p>Your payment of <b>${context.amount} ${context.currency}</b> was successfully processed.</p>
            <p>Transaction ID: ${context.transactionId}</p>
          </div>
        `,
            };
        case 'magic-link':
            return {
                subject: 'Your Linkgrow Sign-in Link',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">Sign in to Linkgrow</h2>
            <p>Click the button below to sign in instantly:</p>
            <a href="${context.magicLinkUrl}" style="background: #4F46E5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">Sign In</a>
          </div>
        `,
            };
        default:
            return {
                subject: 'Notification from Linkgrow',
                html: `<p>${context.message || 'New update from Linkgrow'}</p>`,
            };
    }
}
//# sourceMappingURL=email-templates.js.map