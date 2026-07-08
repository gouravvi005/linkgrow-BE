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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_service_1 = require("../database/database.service");
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const node_1 = require("better-auth/node");
let AuthService = class AuthService {
    db;
    config;
    auth;
    constructor(db, config) {
        this.db = db;
        this.config = config;
    }
    onModuleInit() {
        const secret = this.config.get('BETTER_AUTH_SECRET');
        const url = this.config.get('BETTER_AUTH_URL');
        this.auth = (0, better_auth_1.betterAuth)({
            database: (0, prisma_1.prismaAdapter)(this.db, {
                provider: 'postgresql',
            }),
            emailAndPassword: {
                enabled: true,
            },
            socialProviders: {
                google: {
                    clientId: this.config.get('GOOGLE_AUTH_CLIENT_ID') || 'mock_google_id',
                    clientSecret: this.config.get('GOOGLE_AUTH_CLIENT_SECRET') || 'mock_google_secret',
                },
                github: {
                    clientId: this.config.get('GITHUB_AUTH_CLIENT_ID') || 'mock_github_id',
                    clientSecret: this.config.get('GITHUB_AUTH_CLIENT_SECRET') || 'mock_github_secret',
                },
            },
            user: {
                additionalFields: {
                    username: { type: 'string', required: false },
                    phone: { type: 'string', required: false },
                    provider: { type: 'string', required: false },
                    avatar: { type: 'string', required: false },
                    status: { type: 'string', required: false },
                    role: { type: 'string', required: false },
                    subscription: { type: 'string', required: false },
                    lastLogin: { type: 'date', required: false },
                },
            },
            secret,
            baseURL: url,
            basePath: '/api/v1/auth',
        });
    }
    async handler(req, res) {
        return (0, node_1.toNodeHandler)(this.auth)(req, res);
    }
    async getSession(req) {
        const headers = new Headers();
        Object.entries(req.headers).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => headers.append(key, val));
            }
            else if (value) {
                headers.append(key, value);
            }
        });
        return this.auth.api.getSession({
            headers,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map