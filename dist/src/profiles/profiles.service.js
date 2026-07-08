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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const profiles_repository_1 = require("./profiles.repository");
let ProfilesService = class ProfilesService {
    profilesRepo;
    constructor(profilesRepo) {
        this.profilesRepo = profilesRepo;
    }
    async getProfileByWorkspace(workspaceId) {
        const profile = await this.profilesRepo.findByWorkspaceId(workspaceId);
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found for this workspace. Please create one.');
        }
        return profile;
    }
    async getPublicProfile(username) {
        const profile = await this.profilesRepo.findByUsername(username);
        if (!profile || !profile.isPublished) {
            throw new common_1.NotFoundException('Profile not found or is currently private');
        }
        return profile;
    }
    async createProfile(workspaceId, dto) {
        const existingWorkspaceProfile = await this.profilesRepo.findByWorkspaceId(workspaceId);
        if (existingWorkspaceProfile) {
            throw new common_1.ConflictException('This workspace already has a profile. Update the existing profile instead.');
        }
        const existingUsername = await this.profilesRepo.findByUsername(dto.username);
        if (existingUsername) {
            throw new common_1.ConflictException('Username is already taken');
        }
        return this.profilesRepo.create({
            workspace: { connect: { id: workspaceId } },
            username: dto.username,
            title: dto.title || dto.username,
            bio: dto.bio || '',
            themeSettings: dto.themeSettings || {},
            isPublished: false,
        });
    }
    async updateProfile(workspaceId, dto) {
        const profile = await this.getProfileByWorkspace(workspaceId);
        return this.profilesRepo.update(profile.id, dto);
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiles_repository_1.ProfilesRepository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map