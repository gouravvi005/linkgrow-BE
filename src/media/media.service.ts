import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { StorageService } from '@/storage/storage.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MediaService {
  constructor(
    private readonly db: DatabaseService,
    private readonly storage: StorageService,
    @InjectQueue('image-processing') private readonly imageQueue: Queue,
  ) {}

  async uploadMedia(workspaceId: string, file: Express.Multer.File) {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueKey = `workspaces/${workspaceId}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

    // Upload to Cloudflare R2
    const publicUrl = await this.storage.uploadFile(uniqueKey, file.buffer, file.mimetype);

    // Save record to DB
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

    // Trigger async Image Optimization if it is an image
    if (file.mimetype.startsWith('image/')) {
      await this.imageQueue.add('optimize-image', {
        mediaId: media.id,
        fileKey: uniqueKey,
      });
    }

    return media;
  }

  async deleteMedia(workspaceId: string, mediaId: string) {
    const media = await this.db.media.findFirst({
      where: { id: mediaId, workspaceId, deletedAt: null },
    });

    if (!media) {
      throw new NotFoundException('Media asset not found in this workspace');
    }

    // Delete from R2
    await this.storage.deleteFile(media.fileKey);

    // Soft delete in DB
    return this.db.media.update({
      where: { id: mediaId },
      data: { deletedAt: new Date() },
    });
  }

  async replaceMedia(workspaceId: string, mediaId: string, newFile: Express.Multer.File) {
    const oldMedia = await this.db.media.findFirst({
      where: { id: mediaId, workspaceId, deletedAt: null },
    });

    if (!oldMedia) {
      throw new NotFoundException('Media asset to replace not found');
    }

    // Upload new file
    const fileExtension = newFile.originalname.split('.').pop();
    const uniqueKey = `workspaces/${workspaceId}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

    const newUrl = await this.storage.uploadFile(uniqueKey, newFile.buffer, newFile.mimetype);

    // Delete old file from R2
    await this.storage.deleteFile(oldMedia.fileKey);

    // Update DB
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

    // Optimize if it is an image
    if (newFile.mimetype.startsWith('image/')) {
      await this.imageQueue.add('optimize-image', {
        mediaId: updatedMedia.id,
        fileKey: uniqueKey,
      });
    }

    return updatedMedia;
  }
}
