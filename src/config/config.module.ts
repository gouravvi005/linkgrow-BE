import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error('Invalid environment configuration:\n', JSON.stringify(parsed.error.format(), null, 2));
          throw new Error('Environment validation failed');
        }
        return parsed.data;
      },
    }),
  ],
})
export class ConfigModule {}
