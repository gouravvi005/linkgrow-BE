import { BaseRepository } from "../database/base.repository";
import { DatabaseService } from "../database/database.service";
import { Link, Prisma } from '@prisma/client';
export declare class LinksRepository extends BaseRepository<Link, Prisma.LinkCreateInput, Prisma.LinkUpdateInput> {
    constructor(db: DatabaseService);
    findByProfileId(profileId: string): Promise<Link[]>;
    clearCategory(categoryId: string): Promise<Prisma.BatchPayload>;
}
