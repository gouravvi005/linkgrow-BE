import { BaseRepository } from "../database/base.repository";
import { DatabaseService } from "../database/database.service";
import { Profile, Prisma } from '@prisma/client';
export declare class ProfilesRepository extends BaseRepository<Profile, Prisma.ProfileCreateInput, Prisma.ProfileUpdateInput> {
    constructor(db: DatabaseService);
    findByWorkspaceId(workspaceId: string): Promise<Profile | null>;
    findByUsername(username: string): Promise<Profile | null>;
}
