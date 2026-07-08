import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from "../../cache/cache.service";
export declare class RateLimitGuard implements CanActivate {
    private reflector;
    private cache;
    constructor(reflector: Reflector, cache: CacheService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
