import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { GlobalExceptionFilter } from '@/common/filters/http-exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import type { Request, Response, NextFunction } from 'express';

// Suppress Redis ECONNREFUSED logs/errors in dev when Redis is not running
const isRedisNoise = (str: string) => {
  const s = str.toLowerCase();
  return (
    (s.includes('econnrefused') && (s.includes('6379') || s.includes('redis'))) ||
    s.includes('connection is closed') ||
    s.includes('ioredis')
  );
};

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const noise = args.some((arg) => arg && isRedisNoise(String(arg.message || arg.stack || arg)));
  if (noise) return;
  originalConsoleError(...args);
};

const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = (chunk: any, encoding?: any, callback?: any): boolean => {
  const str = String(chunk);
  if (isRedisNoise(str)) {
    if (callback) callback();
    return true;
  }
  return originalStderrWrite(chunk, encoding, callback);
};

const suppressRedisNoise = (err: any) => {
  if (
    err?.code === 'ECONNREFUSED' ||
    err?.errors?.some?.((e: any) => e?.code === 'ECONNREFUSED')
  ) {
    return; // silently ignore
  }
  console.error('Unhandled error:', err);
};
process.on('uncaughtException', suppressRedisNoise);
process.on('unhandledRejection', suppressRedisNoise);

/**
 * Determines if a URL belongs to Better Auth's handler.
 * These routes must NOT be pre-parsed by Express body parser since
 * toNodeHandler() needs to set req.query and parse the body itself.
 * Mock routes (/api/v1/mock/*) are NOT affected — they get parsed normally.
 */
function isBetterAuthRoute(url: string): boolean {
  // Match /api/v1/auth/* but NOT /api/v1/mock/auth/*
  return /\/api\/v1\/auth(?:\/|$)/.test(url) && !url.includes('/mock/');
}

async function bootstrap() {
  // Disable NestJS built-in body parser so Better Auth's toNodeHandler
  // can set req.query and process auth routes without hitting:
  // "Cannot set property query of #<IncomingMessage> which has only a getter"
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;

  // Use Pino for all logs
  app.useLogger(app.get(Logger));

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Apply JSON body parser to all routes EXCEPT Better Auth routes.
  // Better Auth's toNodeHandler handles its own request parsing.
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (isBetterAuthRoute(req.originalUrl || req.url || '')) {
      return next();
    }
    json({
      verify: (r: any, _res, buf) => {
        // Capture raw body for webhook signature verification
        const rUrl: string = r.originalUrl || r.url || '';
        if (rUrl.includes('/webhooks')) {
          r.rawBody = buf;
        }
      },
    })(req, res, next);
  });

  // Apply URL-encoded body parser (skip auth routes)
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (isBetterAuthRoute(req.originalUrl || req.url || '')) {
      return next();
    }
    urlencoded({ extended: true })(req, res, next);
  });

  // Global Interceptors & Filters
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // API Versioning prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();
