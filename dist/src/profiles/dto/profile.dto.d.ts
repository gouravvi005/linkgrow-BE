import { z } from 'zod';
export declare const createProfileSchema: z.ZodObject<{
    username: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    themeSettings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export declare const updateProfileSchema: z.ZodObject<{
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    themeSettings: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    isPublished: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ProfileResponseDto = {
    id: string;
    workspaceId: string;
    username: string;
    title: string | null;
    bio: string | null;
    avatarUrl: string | null;
    themeSettings: any;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
};
