import { z } from 'zod';

export const createProfileSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9-_]+$/, {
    message: 'Username must contain only alphanumeric characters, dashes, or underscores',
  }),
  title: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  themeSettings: z.record(z.string(), z.any()).optional(),
});

export const updateProfileSchema = z.object({
  title: z.string().max(100).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  themeSettings: z.record(z.string(), z.any()).optional().nullable(),
  isPublished: z.boolean().optional(),
});

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
