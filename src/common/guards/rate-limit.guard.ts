import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from '@/cache/cache.service';
import { RATE_LIMIT_KEY, RateLimitOptions } from '../decorators/rate-limit.decorator';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cache: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Bypass rate limiting if Redis is not available
    if (!this.cache.isAvailable()) {
      return true;
    }

    const handler = context.getHandler();
    const controller = context.getClass();

    // Check metadata for rate limit settings
    const options = this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
      handler,
      controller,
    ]) || { points: 100, duration: 60 }; // Default: 100 reqs per 60s

    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.headers['x-forwarded-for'] || '127.0.0.1';
    const path = request.route?.path || request.url;
    
    // Key prefix: rate_limit:IP:PATH
    const redisKey = `rate_limit:${ip}:${path}`;
    
    const client = this.cache.getClient()!;
    const current = await client.get(redisKey);
    const currentVal = current ? parseInt(current, 10) : 0;

    if (currentVal >= options.points) {
      throw new HttpException(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          errors: ['Rate limit exceeded'],
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (currentVal === 0) {
      // First request, set key with TTL
      await client.set(redisKey, 1, 'EX', options.duration);
    } else {
      await client.incr(redisKey);
    }

    return true;
  }
}
