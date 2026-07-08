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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const links_repository_1 = require("./links.repository");
const categories_repository_1 = require("./categories.repository");
const profiles_repository_1 = require("../profiles/profiles.repository");
let LinksService = class LinksService {
    linksRepo;
    categoriesRepo;
    profilesRepo;
    constructor(linksRepo, categoriesRepo, profilesRepo) {
        this.linksRepo = linksRepo;
        this.categoriesRepo = categoriesRepo;
        this.profilesRepo = profilesRepo;
    }
    async getProfileOrThrow(workspaceId) {
        const profile = await this.profilesRepo.findByWorkspaceId(workspaceId);
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found for this workspace. Initialize one first.');
        }
        return profile;
    }
    async createLink(workspaceId, dto) {
        const profile = await this.getProfileOrThrow(workspaceId);
        if (dto.categoryId) {
            const category = await this.categoriesRepo.findById(dto.categoryId);
            if (!category || category.profileId !== profile.id) {
                throw new common_1.NotFoundException('Category not found for this profile');
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
        });
    }
    async getLinks(workspaceId) {
        const profile = await this.getProfileOrThrow(workspaceId);
        return this.linksRepo.findByProfileId(profile.id);
    }
    async updateLink(workspaceId, id, dto) {
        const profile = await this.getProfileOrThrow(workspaceId);
        const link = await this.linksRepo.findById(id);
        if (!link || link.profileId !== profile.id) {
            throw new common_1.NotFoundException('Link not found in this workspace');
        }
        if (dto.categoryId) {
            const category = await this.categoriesRepo.findById(dto.categoryId);
            if (!category || category.profileId !== profile.id) {
                throw new common_1.NotFoundException('Category not found for this profile');
            }
        }
        const { categoryId, ...rest } = dto;
        return this.linksRepo.update(id, {
            ...rest,
            category: categoryId ? { connect: { id: categoryId } } : categoryId === null ? { disconnect: true } : undefined,
        });
    }
    async deleteLink(workspaceId, id) {
        const profile = await this.getProfileOrThrow(workspaceId);
        const link = await this.linksRepo.findById(id);
        if (!link || link.profileId !== profile.id) {
            throw new common_1.NotFoundException('Link not found in this workspace');
        }
        return this.linksRepo.softDelete(id);
    }
    async createCategory(workspaceId, dto) {
        const profile = await this.getProfileOrThrow(workspaceId);
        return this.categoriesRepo.create({
            profile: { connect: { id: profile.id } },
            name: dto.name,
            sortOrder: dto.sortOrder || 0,
        });
    }
    async getCategories(workspaceId) {
        const profile = await this.getProfileOrThrow(workspaceId);
        return this.categoriesRepo.findByProfileId(profile.id);
    }
    async updateCategory(workspaceId, id, dto) {
        const profile = await this.getProfileOrThrow(workspaceId);
        const category = await this.categoriesRepo.findById(id);
        if (!category || category.profileId !== profile.id) {
            throw new common_1.NotFoundException('Category not found in this workspace');
        }
        return this.categoriesRepo.update(id, dto);
    }
    async deleteCategory(workspaceId, id) {
        const profile = await this.getProfileOrThrow(workspaceId);
        const category = await this.categoriesRepo.findById(id);
        if (!category || category.profileId !== profile.id) {
            throw new common_1.NotFoundException('Category not found in this workspace');
        }
        await this.linksRepo.clearCategory(id);
        return this.categoriesRepo.softDelete(id);
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [links_repository_1.LinksRepository,
        categories_repository_1.CategoriesRepository,
        profiles_repository_1.ProfilesRepository])
], LinksService);
//# sourceMappingURL=links.service.js.map