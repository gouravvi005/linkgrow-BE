import { DatabaseService } from "../database/database.service";
import { CacheService } from "../cache/cache.service";
export declare class HealthController {
    private readonly db;
    private readonly cache;
    constructor(db: DatabaseService, cache: CacheService);
    checkHealth(): Promise<{
        status: string;
        details: {
            database: string;
            redis: string;
        };
    }>;
}
