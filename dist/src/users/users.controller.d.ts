import { DatabaseService } from "../database/database.service";
export declare class UsersController {
    private readonly db;
    constructor(db: DatabaseService);
    getMe(req: any): Promise<{
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
    } | null>;
    updateMe(req: any, body: any): Promise<{
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
}
