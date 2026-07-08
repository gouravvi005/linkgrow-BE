"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWebhookSchema = exports.createWebhookSchema = void 0;
const zod_1 = require("zod");
exports.createWebhookSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    secret: zod_1.z.string().min(8),
    events: zod_1.z.array(zod_1.z.string()).nonempty(),
});
exports.updateWebhookSchema = zod_1.z.object({
    url: zod_1.z.string().url().optional(),
    secret: zod_1.z.string().min(8).optional(),
    events: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=webhook.dto.js.map