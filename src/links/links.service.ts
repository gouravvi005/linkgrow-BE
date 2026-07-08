import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LinksRepository } from './links.repository';
import { CategoriesRepository } from './categories.repository';
import { ProfilesRepository } from '@/profiles/profiles.repository';
import { CreateLinkDto, UpdateLinkDto, CreateCategoryDto, UpdateCategoryDto } from './dto/link.dto';

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepo: LinksRepository,
    private readonly categoriesRepo: CategoriesRepository,
    private readonly profilesRepo: ProfilesRepository,
  ) {}

  private async getProfileOrThrow(workspaceId: string) {
    const profile = await this.profilesRepo.findByWorkspaceId(workspaceId);
    if (!profile) {
      throw new NotFoundException('Profile not found for this workspace. Initialize one first.');
    }
    return profile;
  }

  // --- Links CRUD ---
  async createLink(workspaceId: string, dto: CreateLinkDto) {
    const profile = await this.getProfileOrThrow(workspaceId);

    // If categoryId is specified, ensure it belongs to this profile
    if (dto.categoryId) {
      const category = await this.categoriesRepo.findById(dto.categoryId);
      if (!category || category.profileId !== profile.id) {
        throw new NotFoundException('Category not found for this profile');
      }
    }

    return this.linksRepo.create({
      profile: { connect: { id: profile.id } },
      title: dto.title,
      url: dto.url,
      thumbnailUrl: dto.thumbnailUrl || null,
      isPinned: dto.isPinned || false,
      sortOrder: dto.sortOrder || 0,
      settings: dto.settings || {},
      category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,
    } as any);
  }

  async getLinks(workspaceId: string) {
    const profile = await this.getProfileOrThrow(workspaceId);
    return this.linksRepo.findByProfileId(profile.id);
  }

  async updateLink(workspaceId: string, id: string, dto: UpdateLinkDto) {
    const profile = await this.getProfileOrThrow(workspaceId);
    const link = await this.linksRepo.findById(id);

    if (!link || link.profileId !== profile.id) {
      throw new NotFoundException('Link not found in this workspace');
    }

    if (dto.categoryId) {
      const category = await this.categoriesRepo.findById(dto.categoryId);
      if (!category || category.profileId !== profile.id) {
        throw new NotFoundException('Category not found for this profile');
      }
    }

    const { categoryId, ...rest } = dto;
    return this.linksRepo.update(id, {
      ...rest,
      category: categoryId ? { connect: { id: categoryId } } : categoryId === null ? { disconnect: true } : undefined,
    } as any);
  }

  async deleteLink(workspaceId: string, id: string) {
    const profile = await this.getProfileOrThrow(workspaceId);
    const link = await this.linksRepo.findById(id);

    if (!link || link.profileId !== profile.id) {
      throw new NotFoundException('Link not found in this workspace');
    }

    return this.linksRepo.softDelete(id);
  }

  // --- Categories CRUD ---
  async createCategory(workspaceId: string, dto: CreateCategoryDto) {
    const profile = await this.getProfileOrThrow(workspaceId);

    return this.categoriesRepo.create({
      profile: { connect: { id: profile.id } },
      name: dto.name,
      sortOrder: dto.sortOrder || 0,
    } as any);
  }

  async getCategories(workspaceId: string) {
    const profile = await this.getProfileOrThrow(workspaceId);
    return this.categoriesRepo.findByProfileId(profile.id);
  }

  async updateCategory(workspaceId: string, id: string, dto: UpdateCategoryDto) {
    const profile = await this.getProfileOrThrow(workspaceId);
    const category = await this.categoriesRepo.findById(id);

    if (!category || category.profileId !== profile.id) {
      throw new NotFoundException('Category not found in this workspace');
    }

    return this.categoriesRepo.update(id, dto);
  }

  async deleteCategory(workspaceId: string, id: string) {
    const profile = await this.getProfileOrThrow(workspaceId);
    const category = await this.categoriesRepo.findById(id);

    if (!category || category.profileId !== profile.id) {
      throw new NotFoundException('Category not found in this workspace');
    }

    // Set referencing links category to null
    await this.linksRepo.clearCategory(id);

    return this.categoriesRepo.softDelete(id);
  }
}
