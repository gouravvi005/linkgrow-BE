import { DatabaseService } from "../database/database.service";
import { StorageService } from "../storage/storage.service";
import { Queue } from 'bullmq';
export declare class MediaService {
    private readonly db;
    private readonly storage;
    private readonly imageQueue;
    constructor(db: DatabaseService, storage: StorageService, imageQueue: Queue);
    uploadMedia(workspaceId: string, file: Express.Multer.File): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        fileName: string;
        fileKey: string;
        mimeType: string;
        fileSize: number;
    }>;
    deleteMedia(workspaceId: string, mediaId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        fileName: string;
        fileKey: string;
        mimeType: string;
        fileSize: number;
    }>;
    replaceMedia(workspaceId: string, mediaId: string, newFile: Express.Multer.File): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        workspaceId: string;
        fileName: string;
        fileKey: string;
        mimeType: string;
        fileSize: number;
    }>;
}
