"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const nestjs_pino_1 = require("nestjs-pino");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const config_1 = require("@nestjs/config");
const express_1 = require("express");
const isRedisNoise = (str) => {
    const s = str.toLowerCase();
    return ((s.includes('econnrefused') && (s.includes('6379') || s.includes('redis'))) ||
        s.includes('connection is closed') ||
        s.includes('ioredis'));
};
const originalConsoleError = console.error;
console.error = (...args) => {
    const noise = args.some((arg) => arg && isRedisNoise(String(arg.message || arg.stack || arg)));
    if (noise)
        return;
    originalConsoleError(...args);
};
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = (chunk, encoding, callback) => {
    const str = String(chunk);
    if (isRedisNoise(str)) {
        if (callback)
            callback();
        return true;
    }
    return originalStderrWrite(chunk, encoding, callback);
};
const suppressRedisNoise = (err) => {
    if (err?.code === 'ECONNREFUSED' ||
        err?.errors?.some?.((e) => e?.code === 'ECONNREFUSED')) {
        return;
    }
    console.error('Unhandled error:', err);
};
process.on('uncaughtException', suppressRedisNoise);
process.on('unhandledRejection', suppressRedisNoise);
function isBetterAuthRoute(url) {
    return /\/api\/v1\/auth(?:\/|$)/.test(url) && !url.includes('/mock/');
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        bodyParser: false,
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 5000;
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use((req, res, next) => {
        if (isBetterAuthRoute(req.originalUrl || req.url || '')) {
            return next();
        }
        (0, express_1.json)({
            verify: (r, _res, buf) => {
                const rUrl = r.originalUrl || r.url || '';
                if (rUrl.includes('/webhooks')) {
                    r.rawBody = buf;
                }
            },
        })(req, res, next);
    });
    app.use((req, res, next) => {
        if (isBetterAuthRoute(req.originalUrl || req.url || '')) {
            return next();
        }
        (0, express_1.urlencoded)({ extended: true })(req, res, next);
    });
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    app.setGlobalPrefix('api/v1');
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map