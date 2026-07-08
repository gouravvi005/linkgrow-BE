"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const logger = new common_1.Logger('QueueModule');
let QueueModule = class QueueModule {
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const url = config.get('REDIS_URL');
                    if (!url) {
                        logger.warn('REDIS_URL not set — BullMQ queues disabled');
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
        exports: [bullmq_1.BullModule],
    })
], QueueModule);
//# sourceMappingURL=queue.module.js.map