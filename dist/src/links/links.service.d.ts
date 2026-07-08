import { LinksRepository } from './links.repository';
import { CategoriesRepository } from './categories.repository';
import { ProfilesRepository } from "../profiles/profiles.repository";
import { CreateLinkDto, UpdateLinkDto, CreateCategoryDto, UpdateCategoryDto } from './dto/link.dto';
export declare class LinksService {
    private readonly linksRepo;
    private readonly categoriesRepo;
    private readonly profilesRepo;
    constructor(linksRepo: LinksRepository, categoriesRepo: CategoriesRepository, profilesRepo: ProfilesRepository);
    private getProfileOrThrow;
    createLink(workspaceId: string, dto: CreateLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        title: string;
        sortOrder: number;
        profileId: string;
        thumbnailUrl: string | null;
        isPinned: boolean;
        isArchived: boolean;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        categoryId: string | null;
    }>;
    getLinks(workspaceId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        title: string;
        sortOrder: number;
        profileId: string;
        thumbnailUrl: string | null;
        isPinned: boolean;
        isArchived: boolean;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        categoryId: string | null;
    }[]>;
    updateLink(workspaceId: string, id: string, dto: UpdateLinkDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        title: string;
        sortOrder: number;
        profileId: string;
        thumbnailUrl: string | null;
        isPinned: boolean;
        isArchived: boolean;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        categoryId: string | null;
    }>;
    deleteLink(workspaceId: string, id: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        title: string;
        sortOrder: number;
        profileId: string;
        thumbnailUrl: string | null;
        isPinned: boolean;
        isArchived: boolean;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        categoryId: string | null;
    }>;
    createCategory(workspaceId: string, dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }>;
    getCategories(workspaceId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }[]>;
    updateCategory(workspaceId: string, id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }>;
    deleteCategory(workspaceId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }>;
}
