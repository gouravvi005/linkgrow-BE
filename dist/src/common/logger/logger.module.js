"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const isProd = config.get('NODE_ENV') === 'production';
                    return {
                        pinoHttp: {
                            level: isProd ? 'info' : 'debug',
                            transport: isProd
                                ? undefined
                                : {
                                    target: 'pino-pretty',
                                    options: {
                                        singleLine: true,
                                        colorize: true,
                                        translateTime: 'SYS:standard',
                                    },
                                },
                            redact: [
                                'req.headers.authorization',
                                'req.headers.cookie',
                                'body.password',
                                'body.token',
                                'body.secret',
                                'body.apiKey',
                            ],
                            serializers: {
                                req: (req) => ({
                                    id: req.id,
                                    method: req.method,
                                    url: req.url,
                                    query: req.query,
                                    headers: isProd ? undefined : req.headers,
                                }),
                                res: (res) => ({
                                    statusCode: res.statusCode,
                                }),
                            },
                        },
                    };
                },
            }),
        ],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map