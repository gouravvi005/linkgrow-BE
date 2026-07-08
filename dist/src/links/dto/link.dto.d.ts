import { z } from 'zod';
export declare const createLinkSchema: z.ZodObject<{
    title: z.ZodString;
    url: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    isPinned: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export declare const updateLinkSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    thumbnailUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isPinned: z.ZodOptional<z.ZodBoolean>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    settings: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.core.$strip>;
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateLinkDto = z.infer<typeof createLinkSchema>;
export type UpdateLinkDto = z.infer<typeof updateLinkSchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
