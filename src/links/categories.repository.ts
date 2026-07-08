import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/base.repository';
import { DatabaseService } from '@/database/database.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository extends BaseRepository<
  Category,
  Prisma.CategoryCreateInput,
  Prisma.CategoryUpdateInput
> {
  constructor(db: DatabaseService) {
    super(db, db.category);
  }

  async findByProfileId(profileId: string): Promise<Category[]> {
    return this.db.category.findMany({
      where: { profileId, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
