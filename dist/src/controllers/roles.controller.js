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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
let RolesController = class RolesController {
    db;
    constructor(db) {
        this.db = db;
    }
    async getRoles() {
        const roles = await this.db.role.findMany({
            include: {
                memberships: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return roles.map((role) => ({
            id: role.id,
            name: role.name,
            description: role.description,
            users: role.memberships.map((m) => ({
                id: m.user.id,
                name: m.user.name,
                email: m.user.email,
                avatar: m.user.avatar || m.user.image,
            })),
        }));
    }
    async getUsers(pageIndex = '1', pageSize = '10', sortKey = '', order = 'asc', query = '', role, status) {
        const skip = (parseInt(pageIndex) - 1) * parseInt(pageSize);
        const take = parseInt(pageSize);
        const where = { deletedAt: null };
        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
                { username: { contains: query, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.role = { equals: role, mode: 'insensitive' };
        }
        if (status) {
            where.status = { equals: status, mode: 'insensitive' };
        }
        const orderBy = {};
        if (sortKey) {
            if (sortKey === 'lastOnline') {
                orderBy.lastLogin = order.toLowerCase();
            }
            else {
                orderBy[sortKey] = order.toLowerCase();
            }
        }
        else {
            orderBy.createdAt = 'desc';
        }
        const [users, total] = await Promise.all([
            this.db.user.findMany({
                where,
                skip,
                take,
                orderBy,
            }),
            this.db.user.count({ where }),
        ]);
        const list = users.map((u) => ({
            id: u.id,
            name: u.name,
            userName: u.username || u.name,
            email: u.email,
            phone: u.phone || '',
            avatar: u.avatar || u.image || '',
            status: u.status,
            role: u.role,
            subscription: u.subscription,
            createdAt: u.createdAt,
            lastLogin: u.lastLogin,
            emailVerified: u.emailVerified,
            lastOnline: u.lastLogin ? Math.floor(u.lastLogin.getTime() / 1000) : Math.floor(u.createdAt.getTime() / 1000),
        }));
        return {
            list,
            total,
        };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('sortKey')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('query')),
    __param(5, (0, common_1.Query)('role')),
    __param(6, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getUsers", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map