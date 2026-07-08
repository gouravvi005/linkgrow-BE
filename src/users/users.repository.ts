import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/base.repository';
import { DatabaseService } from '@/database/database.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(db: DatabaseService) {
    super(db, db.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: { email, deletedAt: null },
    });
  }
}
