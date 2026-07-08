import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { DatabaseService } from '@/database/database.service';
import { createWebhookSchema, updateWebhookSchema } from './dto/webhook.dto';
import type { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

@Controller('admin/webhooks')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getWebhooks(@ActiveWorkspaceId() workspaceId: string) {
    return this.db.webhook.findMany({
      where: { workspaceId, deletedAt: null },
    });
  }

  @Post()
  async createWebhook(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(createWebhookSchema)) body: CreateWebhookDto,
  ) {
    return this.db.webhook.create({
      data: {
        workspaceId,
        url: body.url,
        secret: body.secret,
        events: body.events,
      },
    });
  }

  @Patch(':id')
  async updateWebhook(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateWebhookSchema)) body: UpdateWebhookDto,
  ) {
    const webhook = await this.db.webhook.findFirst({
      where: { id, workspaceId, deletedAt: null },
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found in this workspace');
    }

    return this.db.webhook.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async deleteWebhook(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
  ) {
    const webhook = await this.db.webhook.findFirst({
      where: { id, workspaceId, deletedAt: null },
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found in this workspace');
    }

    return this.db.webhook.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
