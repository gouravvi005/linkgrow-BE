import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { MediaService } from './media.service';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @ActiveWorkspaceId() workspaceId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.mediaService.uploadMedia(workspaceId, file);
  }

  @Delete(':id')
  async deleteMedia(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
  ) {
    return this.mediaService.deleteMedia(workspaceId, id);
  }

  @Post('replace/:id')
  @UseInterceptors(FileInterceptor('file'))
  async replaceMedia(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No replacement file uploaded');
    }
    return this.mediaService.replaceMedia(workspaceId, id, file);
  }
}
