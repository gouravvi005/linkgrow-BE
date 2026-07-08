import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepo: ProfilesRepository) {}

  async getProfileByWorkspace(workspaceId: string) {
    const profile = await this.profilesRepo.findByWorkspaceId(workspaceId);
    if (!profile) {
      throw new NotFoundException('Profile not found for this workspace. Please create one.');
    }
    return profile;
  }

  async getPublicProfile(username: string) {
    const profile = await this.profilesRepo.findByUsername(username);
    if (!profile || !profile.isPublished) {
      throw new NotFoundException('Profile not found or is currently private');
    }
    return profile;
  }

  async createProfile(workspaceId: string, dto: CreateProfileDto) {
    // Check if workspace already has a profile
    const existingWorkspaceProfile = await this.profilesRepo.findByWorkspaceId(workspaceId);
    if (existingWorkspaceProfile) {
      throw new ConflictException('This workspace already has a profile. Update the existing profile instead.');
    }

    // Check if username is taken
    const existingUsername = await this.profilesRepo.findByUsername(dto.username);
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    return this.profilesRepo.create({
      workspace: { connect: { id: workspaceId } },
      username: dto.username,
      title: dto.title || dto.username,
      bio: dto.bio || '',
      themeSettings: dto.themeSettings || {},
      isPublished: false,
    } as any);
  }

  async updateProfile(workspaceId: string, dto: UpdateProfileDto) {
    const profile = await this.getProfileByWorkspace(workspaceId);
    return this.profilesRepo.update(profile.id, dto as any);
  }
}
