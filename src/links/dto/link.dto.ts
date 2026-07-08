import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().url(),
  categoryId: z.string().uuid().optional(),
  thumbnailUrl: z.string().url().optional(),
  isPinned: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
  settings: z.record(z.string(), z.any()).optional(),
});

export const updateLinkSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  url: z.string().url().optional(),
  categoryId: z.string().uuid().optional().nullable(),
  thumbnailUrl: z.string().url().optional().nullable(),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  settings: z.record(z.string(), z.any()).optional().nullable(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  sortOrder: z.number().int().optional().default(0),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  sortOrder: z.number().int().optional(),
});

export type CreateLinkDto = z.infer<typeof createLinkSchema>;
export type UpdateLinkDto = z.infer<typeof updateLinkSchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
