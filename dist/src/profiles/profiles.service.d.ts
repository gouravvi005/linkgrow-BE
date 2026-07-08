import { ProfilesRepository } from './profiles.repository';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
export declare class ProfilesService {
    private readonly profilesRepo;
    constructor(profilesRepo: ProfilesRepository);
    getProfileByWorkspace(workspaceId: string): Promise<{
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
    createProfile(workspaceId: string, dto: CreateProfileDto): Promise<{
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
    updateProfile(workspaceId: string, dto: UpdateProfileDto): Promise<{
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
