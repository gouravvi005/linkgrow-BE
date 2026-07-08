import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private client: Redis | null = null;
  private readonly logger = new Logger(CacheService.name);
  private available = false;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('REDIS_URL');
    if (!url) {
      this.logger.warn('REDIS_URL not set — cache disabled (no-op mode)');
      return;
    }

    try {
      this.client = new Redis(url, {
        maxRetriesPerRequest: null,
        lazyConnect: true,
        enableOfflineQueue: false,
      });

      this.client.on('connect', () => {
        this.available = true;
        this.logger.log('Redis connected');
      });

      this.client.on('error', (err) => {
        if (this.available) {
          this.logger.warn(`Redis error: ${err.message} — cache disabled`);
        }
        this.available = false;
      });

      this.client.connect().catch((err) => {
        this.logger.warn(`Redis unavailable: ${err.message} — running without cache`);
        this.available = false;
      });
    } catch (err: any) {
      this.logger.warn(`Redis init failed: ${err.message} — running without cache`);
    }
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  isAvailable(): boolean {
    return this.available && this.client !== null;
  }

  getClient(): Redis | null {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    if (!this.isAvailable()) return null;
    return this.client!.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.isAvailable()) return;
    if (ttlSeconds) {
      await this.client!.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client!.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isAvailable()) return;
    await this.client!.del(key);
  }

  async incr(key: string): Promise<number> {
    if (!this.isAvailable()) return 0;
    return this.client!.incr(key);
  }

  async expire(key: string, seconds: number): Promise<number> {
    if (!this.isAvailable()) return 0;
    return this.client!.expire(key, seconds);
  }

  async hincrby(key: string, field: string, increment: number): Promise<number> {
    if (!this.isAvailable()) return 0;
    return this.client!.hincrby(key, field, increment);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.isAvailable()) return {};
    return this.client!.hgetall(key);
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.isAvailable()) return [];
    return this.client!.keys(pattern);
  }
}
