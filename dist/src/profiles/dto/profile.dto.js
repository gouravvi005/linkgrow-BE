"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.createProfileSchema = void 0;
const zod_1 = require("zod");
exports.createProfileSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(30).regex(/^[a-zA-Z0-9-_]+$/, {
        message: 'Username must contain only alphanumeric characters, dashes, or underscores',
    }),
    title: zod_1.z.string().max(100).optional(),
    bio: zod_1.z.string().max(500).optional(),
    themeSettings: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
exports.updateProfileSchema = zod_1.z.object({
    title: zod_1.z.string().max(100).optional().nullable(),
    bio: zod_1.z.string().max(500).optional().nullable(),
    avatarUrl: zod_1.z.string().url().optional().nullable(),
    themeSettings: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional().nullable(),
    isPublished: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=profile.dto.js.map