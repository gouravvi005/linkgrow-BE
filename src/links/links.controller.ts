import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { LinksService } from './links.service';
import {
  createLinkSchema,
  updateLinkSchema,
  createCategorySchema,
  updateCategorySchema,
} from './dto/link.dto';
import type {
  CreateLinkDto,
  UpdateLinkDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/link.dto';

@Controller('links')
@UseGuards(AuthGuard)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  // --- Links ---
  @Get()
  async getLinks(@ActiveWorkspaceId() workspaceId: string) {
    return this.linksService.getLinks(workspaceId);
  }

  @Post()
  async createLink(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(createLinkSchema)) body: CreateLinkDto,
  ) {
    return this.linksService.createLink(workspaceId, body);
  }

  @Patch(':id')
  async updateLink(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateLinkSchema)) body: UpdateLinkDto,
  ) {
    return this.linksService.updateLink(workspaceId, id, body);
  }

  @Delete(':id')
  async deleteLink(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
  ) {
    return this.linksService.deleteLink(workspaceId, id);
  }

  // --- Categories ---
  @Get('categories')
  async getCategories(@ActiveWorkspaceId() workspaceId: string) {
    return this.linksService.getCategories(workspaceId);
  }

  @Post('categories')
  async createCategory(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDto,
  ) {
    return this.linksService.createCategory(workspaceId, body);
  }

  @Patch('categories/:id')
  async updateCategory(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCategorySchema)) body: UpdateCategoryDto,
  ) {
    return this.linksService.updateCategory(workspaceId, id, body);
  }

  @Delete('categories/:id')
  async deleteCategory(
    @ActiveWorkspaceId() workspaceId: string,
    @Param('id') id: string,
  ) {
    return this.linksService.deleteCategory(workspaceId, id);
  }
}
