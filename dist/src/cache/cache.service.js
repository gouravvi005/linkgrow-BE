"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let CacheService = CacheService_1 = class CacheService {
    config;
    client = null;
    logger = new common_1.Logger(CacheService_1.name);
    available = false;
    constructor(config) {
        this.config = config;
    }
    onModuleInit() {
        const url = this.config.get('REDIS_URL');
        if (!url) {
            this.logger.warn('REDIS_URL not set — cache disabled (no-op mode)');
            return;
        }
        try {
            this.client = new ioredis_1.default(url, {
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
        }
        catch (err) {
            this.logger.warn(`Redis init failed: ${err.message} — running without cache`);
        }
    }
    onModuleDestroy() {
        if (this.client) {
            this.client.disconnect();
        }
    }
    isAvailable() {
        return this.available && this.client !== null;
    }
    getClient() {
        return this.client;
    }
    async get(key) {
        if (!this.isAvailable())
            return null;
        return this.client.get(key);
    }
    async set(key, value, ttlSeconds) {
        if (!this.isAvailable())
            return;
        if (ttlSeconds) {
            await this.client.set(key, value, 'EX', ttlSeconds);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async del(key) {
        if (!this.isAvailable())
            return;
        await this.client.del(key);
    }
    async incr(key) {
        if (!this.isAvailable())
            return 0;
        return this.client.incr(key);
    }
    async expire(key, seconds) {
        if (!this.isAvailable())
            return 0;
        return this.client.expire(key, seconds);
    }
    async hincrby(key, field, increment) {
        if (!this.isAvailable())
            return 0;
        return this.client.hincrby(key, field, increment);
    }
    async hgetall(key) {
        if (!this.isAvailable())
            return {};
        return this.client.hgetall(key);
    }
    async keys(pattern) {
        if (!this.isAvailable())
            return [];
        return this.client.keys(pattern);
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CacheService);
//# sourceMappingURL=cache.service.js.map