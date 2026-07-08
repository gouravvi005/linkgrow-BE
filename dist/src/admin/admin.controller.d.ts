import { DatabaseService } from "../database/database.service";
import type { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
export declare class AdminController {
    private readonly db;
    constructor(db: DatabaseService);
    getWebhooks(workspaceId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        secret: string;
        events: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }[]>;
    createWebhook(workspaceId: string, body: CreateWebhookDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        secret: string;
        events: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }>;
    updateWebhook(workspaceId: string, id: string, body: UpdateWebhookDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        secret: string;
        events: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }>;
    deleteWebhook(workspaceId: string, id: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        secret: string;
        events: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }>;
}
