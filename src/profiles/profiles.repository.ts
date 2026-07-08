import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/base.repository';
import { DatabaseService } from '@/database/database.service';
import { Profile, Prisma } from '@prisma/client';

@Injectable()
export class ProfilesRepository extends BaseRepository<
  Profile,
  Prisma.ProfileCreateInput,
  Prisma.ProfileUpdateInput
> {
  constructor(db: DatabaseService) {
    super(db, db.profile);
  }

  async findByWorkspaceId(workspaceId: string): Promise<Profile | null> {
    return this.db.profile.findFirst({
      where: { workspaceId, deletedAt: null },
    });
  }

  async findByUsername(username: string): Promise<Profile | null> {
    return this.db.profile.findFirst({
      where: { username, deletedAt: null },
    });
  }
}
