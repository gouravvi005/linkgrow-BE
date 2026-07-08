import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/base.repository';
import { DatabaseService } from '@/database/database.service';
import { Link, Prisma } from '@prisma/client';

@Injectable()
export class LinksRepository extends BaseRepository<
  Link,
  Prisma.LinkCreateInput,
  Prisma.LinkUpdateInput
> {
  constructor(db: DatabaseService) {
    super(db, db.link);
  }

  async findByProfileId(profileId: string): Promise<Link[]> {
    return this.db.link.findMany({
      where: { profileId, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async clearCategory(categoryId: string) {
    return this.db.link.updateMany({
      where: { categoryId },
      data: { categoryId: null },
    });
  }
}
