import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { DatabaseService } from "../../database/database.service";
export declare class AuthGuard implements CanActivate {
    private readonly auth;
    private readonly db;
    constructor(auth: AuthService, db: DatabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
