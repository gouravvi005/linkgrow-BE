import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
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
    deleteMedia(workspaceId: string, id: string): Promise<{
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
    replaceMedia(workspaceId: string, id: string, file: Express.Multer.File): Promise<{
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
