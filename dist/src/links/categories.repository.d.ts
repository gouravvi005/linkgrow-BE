import { BaseRepository } from "../database/base.repository";
import { DatabaseService } from "../database/database.service";
import { Category, Prisma } from '@prisma/client';
export declare class CategoriesRepository extends BaseRepository<Category, Prisma.CategoryCreateInput, Prisma.CategoryUpdateInput> {
    constructor(db: DatabaseService);
    findByProfileId(profileId: string): Promise<Category[]>;
}
