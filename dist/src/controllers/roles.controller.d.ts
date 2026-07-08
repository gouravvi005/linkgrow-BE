import { DatabaseService } from "../database/database.service";
export declare class RolesController {
    private readonly db;
    constructor(db: DatabaseService);
    getRoles(): Promise<{
        id: string;
        name: string;
        description: string | null;
        users: {
            id: string;
            name: string;
            email: string;
            avatar: string | null;
        }[];
    }[]>;
    getUsers(pageIndex?: string, pageSize?: string, sortKey?: string, order?: string, query?: string, role?: string, status?: string): Promise<{
        list: {
            id: string;
            name: string;
            userName: string;
            email: string;
            phone: string;
            avatar: string;
            status: string;
            role: string;
            subscription: string;
            createdAt: Date;
            lastLogin: Date | null;
            emailVerified: boolean;
            lastOnline: number;
        }[];
        total: number;
    }>;
}
