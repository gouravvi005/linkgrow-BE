import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class StorageService implements OnModuleInit {
    private readonly config;
    private s3Client;
    private bucketName;
    private publicUrl;
    constructor(config: ConfigService);
    onModuleInit(): void;
    uploadFile(key: string, buffer: Buffer, contentType: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
}
