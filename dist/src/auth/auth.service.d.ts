import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from "../database/database.service";
import type { Request, Response } from 'express';
export declare class AuthService implements OnModuleInit {
    readonly db: DatabaseService;
    private readonly config;
    auth: any;
    constructor(db: DatabaseService, config: ConfigService);
    onModuleInit(): void;
    handler(req: Request, res: Response): Promise<void>;
    getSession(req: Request): Promise<any>;
}
