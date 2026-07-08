import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class CacheService implements OnModuleInit, OnModuleDestroy {
    private config;
    private client;
    private readonly logger;
    private available;
    constructor(config: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    isAvailable(): boolean;
    getClient(): Redis | null;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    incr(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    hincrby(key: string, field: string, increment: number): Promise<number>;
    hgetall(key: string): Promise<Record<string, string>>;
    keys(pattern: string): Promise<string[]>;
}
