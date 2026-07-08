"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const storage_service_1 = require("../storage/storage.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let MediaService = class MediaService {
    db;
    storage;
    imageQueue;
    constructor(db, storage, imageQueue) {
        this.db = db;
        this.storage = storage;
        this.imageQueue = imageQueue;
    }
    async uploadMedia(workspaceId, file) {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueKey = `workspaces/${workspaceId}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
        const publicUrl = await this.storage.uploadFile(uniqueKey, file.buffer, file.mimetype);
        const media = await this.db.media.create({
            data: {
                workspaceId,
                fileName: file.originalname,
                fileKey: uniqueKey,
                mimeType: file.mimetype,
                fileSize: file.size,
                url: publicUrl,
            },
        });
        if (file.mimetype.startsWith('image/')) {
            await this.imageQueue.add('optimize-image', {
                mediaId: media.id,
                fileKey: uniqueKey,
            });
        }
        return media;
    }
    async deleteMedia(workspaceId, mediaId) {
        const media = await this.db.media.findFirst({
            where: { id: mediaId, workspaceId, deletedAt: null },
        });
        if (!media) {
            throw new common_1.NotFoundException('Media asset not found in this workspace');
        }
        await this.storage.deleteFile(media.fileKey);
        return this.db.media.update({
            where: { id: mediaId },
            data: { deletedAt: new Date() },
        });
    }
    async replaceMedia(workspaceId, mediaId, newFile) {
        const oldMedia = await this.db.media.findFirst({
            where: { id: mediaId, workspaceId, deletedAt: null },
        });
        if (!oldMedia) {
            throw new common_1.NotFoundException('Media asset to replace not found');
        }
        const fileExtension = newFile.originalname.split('.').pop();
        const uniqueKey = `workspaces/${workspaceId}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
        const newUrl = await this.storage.uploadFile(uniqueKey, newFile.buffer, newFile.mimetype);
        await this.storage.deleteFile(oldMedia.fileKey);
        const updatedMedia = await this.db.media.update({
            where: { id: mediaId },
            data: {
                fileName: newFile.originalname,
                fileKey: uniqueKey,
                mimeType: newFile.mimetype,
                fileSize: newFile.size,
                url: newUrl,
            },
        });
        if (newFile.mimetype.startsWith('image/')) {
            await this.imageQueue.add('optimize-image', {
                mediaId: updatedMedia.id,
                fileKey: uniqueKey,
            });
        }
        return updatedMedia;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('image-processing')),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        storage_service_1.StorageService,
        bullmq_2.Queue])
], MediaService);
//# sourceMappingURL=media.service.js.map