import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ProfilesService } from './profiles.service';
import { ActiveWorkspaceId } from '@/auth/decorators/active-workspace.decorator';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { createProfileSchema, updateProfileSchema } from './dto/profile.dto';
import type { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProfile(@ActiveWorkspaceId() workspaceId: string) {
    return this.profilesService.getProfileByWorkspace(workspaceId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProfile(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(createProfileSchema)) body: CreateProfileDto,
  ) {
    return this.profilesService.createProfile(workspaceId, body);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateProfile(
    @ActiveWorkspaceId() workspaceId: string,
    @Body(new ZodValidationPipe(updateProfileSchema)) body: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(workspaceId, body);
  }

  @Get('public/:username')
  async getPublicProfile(@Param('username') username: string) {
    return this.profilesService.getPublicProfile(username);
  }
}
