import { DatabaseService } from "../database/database.service";
export declare class CustomersController {
    private readonly db;
    constructor(db: DatabaseService);
    getCustomers(pageIndex?: string, pageSize?: string, sortKey?: string, order?: string, query?: string): Promise<{
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
            totalSpending: number;
            lastOnline: number;
        }[];
        total: number;
    }>;
    getCustomerLog(): Promise<{
        id: string;
        dateTime: number;
        userName: string;
        avatar: string;
        action: string;
        type: string;
    }[]>;
    getCustomer(id: string): Promise<{
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
        lastOnline: number;
        emailVerified: boolean;
        activityLog: {
            id: string;
            dateTime: number;
            action: string;
            type: string;
        }[];
    }>;
    editUser(id: string, body: any): Promise<{
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
    deleteUser(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
