import { Global, Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('QueueModule');

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL');
        if (!url) {
          logger.warn('REDIS_URL not set — BullMQ queues disabled');
          // Return a config that will lazily fail without crashing startup
          return {
            connection: {
              host: '127.0.0.1',
              port: 6379,
              lazyConnect: true,
              enableOfflineQueue: false,
              maxRetriesPerRequest: 0,
            },
          };
        }
        const redisUrl = new URL(url);
        return {
          connection: {
            host: redisUrl.hostname,
            port: parseInt(redisUrl.port || '6379', 10),
            username: redisUrl.username || undefined,
            password: redisUrl.password || undefined,
            lazyConnect: true,
            enableOfflineQueue: false,
            maxRetriesPerRequest: 0,
          },
        };
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
