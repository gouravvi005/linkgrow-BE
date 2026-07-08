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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const cache_service_1 = require("../cache/cache.service");
let HealthController = class HealthController {
    db;
    cache;
    constructor(db, cache) {
        this.db = db;
        this.cache = cache;
    }
    async checkHealth() {
        const health = {
            status: 'up',
            details: {
                database: 'down',
                redis: 'down',
            },
        };
        try {
            await this.db.$queryRaw `SELECT 1`;
            health.details.database = 'up';
        }
        catch (err) {
            health.status = 'down';
        }
        try {
            const redisClient = this.cache.getClient();
            if (redisClient) {
                const ping = await redisClient.ping();
                if (ping === 'PONG') {
                    health.details.redis = 'up';
                }
                else {
                    health.details.redis = 'down';
                }
            }
            else {
                health.details.redis = 'unavailable';
            }
        }
        catch (err) {
            health.details.redis = 'down';
        }
        if (health.status === 'down') {
            throw new common_1.ServiceUnavailableException(health);
        }
        return health;
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        cache_service_1.CacheService])
], HealthController);
//# sourceMappingURL=health.controller.js.map