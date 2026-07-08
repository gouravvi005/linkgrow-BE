import { DatabaseService } from "../database/database.service";
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly db;
    private readonly usersRepo;
    constructor(db: DatabaseService, usersRepo: UsersRepository);
    getUserById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        role: string;
        username: string | null;
        email: string;
        emailVerified: boolean;
        phone: string | null;
        password: string | null;
        provider: string | null;
        image: string | null;
        avatar: string | null;
        status: string;
        subscription: string;
        lastLogin: Date | null;
    }>;
    createWorkspace(userId: string, name: string, slug: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        slug: string;
    }>;
    getWorkspacesForUser(userId: string): Promise<({
        members: ({
            role: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            workspaceId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        slug: string;
    })[]>;
}
