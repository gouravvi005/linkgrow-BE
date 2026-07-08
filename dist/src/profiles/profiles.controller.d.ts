import { ProfilesService } from './profiles.service';
import type { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getProfile(workspaceId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        workspaceId: string;
        title: string | null;
        bio: string | null;
        avatarUrl: string | null;
        themeSettings: import("@prisma/client/runtime/client").JsonValue | null;
        isPublished: boolean;
    }>;
    createProfile(workspaceId: string, body: CreateProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        workspaceId: string;
        title: string | null;
        bio: string | null;
        avatarUrl: string | null;
        themeSettings: import("@prisma/client/runtime/client").JsonValue | null;
        isPublished: boolean;
    }>;
    updateProfile(workspaceId: string, body: UpdateProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        workspaceId: string;
        title: string | null;
        bio: string | null;
        avatarUrl: string | null;
        themeSettings: import("@prisma/client/runtime/client").JsonValue | null;
        isPublished: boolean;
    }>;
    getPublicProfile(username: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        workspaceId: string;
        title: string | null;
        bio: string | null;
        avatarUrl: string | null;
        themeSettings: import("@prisma/client/runtime/client").JsonValue | null;
        isPublished: boolean;
    }>;
}
