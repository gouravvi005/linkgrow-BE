"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = exports.updateLinkSchema = exports.createLinkSchema = void 0;
const zod_1 = require("zod");
exports.createLinkSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    url: zod_1.z.string().url(),
    categoryId: zod_1.z.string().uuid().optional(),
    thumbnailUrl: zod_1.z.string().url().optional(),
    isPinned: zod_1.z.boolean().optional().default(false),
    sortOrder: zod_1.z.number().int().optional().default(0),
    settings: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
exports.updateLinkSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).optional(),
    url: zod_1.z.string().url().optional(),
    categoryId: zod_1.z.string().uuid().optional().nullable(),
    thumbnailUrl: zod_1.z.string().url().optional().nullable(),
    isPinned: zod_1.z.boolean().optional(),
    isArchived: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().int().optional(),
    settings: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional().nullable(),
});
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    sortOrder: zod_1.z.number().int().optional().default(0),
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50).optional(),
    sortOrder: zod_1.z.number().int().optional(),
});
//# sourceMappingURL=link.dto.js.map