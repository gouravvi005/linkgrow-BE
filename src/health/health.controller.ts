import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CacheService } from '@/cache/cache.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly db: DatabaseService,
    private readonly cache: CacheService,
  ) {}

  @Get()
  async checkHealth() {
    const health = {
      status: 'up',
      details: {
        database: 'down',
        redis: 'down',
      },
    };

    try {
      // Check database connection
      await this.db.$queryRaw`SELECT 1`;
      health.details.database = 'up';
    } catch (err) {
      health.status = 'down';
    }

    try {
      // Check Redis connection
      const redisClient = this.cache.getClient();
      if (redisClient) {
        const ping = await redisClient.ping();
        if (ping === 'PONG') {
          health.details.redis = 'up';
        } else {
          health.details.redis = 'down';
        }
      } else {
        health.details.redis = 'unavailable';
      }
    } catch (err) {
      health.details.redis = 'down';
    }

    if (health.status === 'down') {
      throw new ServiceUnavailableException(health);
    }

    return health;
  }
}
