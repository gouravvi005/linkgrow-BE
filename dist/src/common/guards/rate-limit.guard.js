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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_service_1 = require("../../cache/cache.service");
const rate_limit_decorator_1 = require("../decorators/rate-limit.decorator");
let RateLimitGuard = class RateLimitGuard {
    reflector;
    cache;
    constructor(reflector, cache) {
        this.reflector = reflector;
        this.cache = cache;
    }
    async canActivate(context) {
        if (!this.cache.isAvailable()) {
            return true;
        }
        const handler = context.getHandler();
        const controller = context.getClass();
        const options = this.reflector.getAllAndOverride(rate_limit_decorator_1.RATE_LIMIT_KEY, [
            handler,
            controller,
        ]) || { points: 100, duration: 60 };
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || request.headers['x-forwarded-for'] || '127.0.0.1';
        const path = request.route?.path || request.url;
        const redisKey = `rate_limit:${ip}:${path}`;
        const client = this.cache.getClient();
        const current = await client.get(redisKey);
        const currentVal = current ? parseInt(current, 10) : 0;
        if (currentVal >= options.points) {
            throw new common_1.HttpException({
                success: false,
                message: 'Too many requests. Please try again later.',
                errors: ['Rate limit exceeded'],
            }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        if (currentVal === 0) {
            await client.set(redisKey, 1, 'EX', options.duration);
        }
        else {
            await client.incr(redisKey);
        }
        return true;
    }
};
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard = RateLimitGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        cache_service_1.CacheService])
], RateLimitGuard);
//# sourceMappingURL=rate-limit.guard.js.map