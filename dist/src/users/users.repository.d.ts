import { BaseRepository } from "../database/base.repository";
import { DatabaseService } from "../database/database.service";
import { User, Prisma } from '@prisma/client';
export declare class UsersRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
    constructor(db: DatabaseService);
    findByEmail(email: string): Promise<User | null>;
}
