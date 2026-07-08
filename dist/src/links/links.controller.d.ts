import { LinksService } from './links.service';
import type { CreateLinkDto, UpdateLinkDto, CreateCategoryDto, UpdateCategoryDto } from './dto/link.dto';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
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
    createLink(workspaceId: string, body: CreateLinkDto): Promise<{
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
    updateLink(workspaceId: string, id: string, body: UpdateLinkDto): Promise<{
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
    getCategories(workspaceId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }[]>;
    createCategory(workspaceId: string, body: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        sortOrder: number;
        profileId: string;
    }>;
    updateCategory(workspaceId: string, id: string, body: UpdateCategoryDto): Promise<{
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
