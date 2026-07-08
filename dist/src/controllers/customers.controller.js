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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
let CustomersController = class CustomersController {
    db;
    constructor(db) {
        this.db = db;
    }
    async getCustomers(pageIndex = '1', pageSize = '10', sortKey = '', order = 'asc', query = '') {
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
        const orderBy = {};
        if (sortKey) {
            if (sortKey === 'totalSpending') {
                orderBy.createdAt = order.toLowerCase();
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
            totalSpending: u.subscription === 'pro' ? 19.00 : u.subscription === 'enterprise' ? 99.00 : 0.00,
            lastOnline: u.lastLogin ? Math.floor(u.lastLogin.getTime() / 1000) : Math.floor(u.createdAt.getTime() / 1000),
        }));
        return {
            list,
            total,
        };
    }
    async getCustomerLog() {
        const logs = await this.db.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: { user: true },
        });
        return logs.map((log) => ({
            id: log.id,
            dateTime: Math.floor(log.createdAt.getTime() / 1000),
            userName: log.user?.name || 'System',
            avatar: log.user?.avatar || '',
            action: log.action,
            type: log.entityType,
        }));
    }
    async getCustomer(id) {
        const user = await this.db.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const logs = await this.db.auditLog.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        return {
            id: user.id,
            name: user.name,
            userName: user.username || user.name,
            email: user.email,
            phone: user.phone || '',
            avatar: user.avatar || user.image || '',
            status: user.status,
            role: user.role,
            subscription: user.subscription,
            createdAt: user.createdAt,
            lastOnline: user.lastLogin ? Math.floor(user.lastLogin.getTime() / 1000) : Math.floor(user.createdAt.getTime() / 1000),
            emailVerified: user.emailVerified,
            activityLog: logs.map((l) => ({
                id: l.id,
                dateTime: Math.floor(l.createdAt.getTime() / 1000),
                action: l.action,
                type: l.entityType,
            })),
        };
    }
    async editUser(id, body) {
        const data = {};
        if (body.name !== undefined)
            data.name = body.name;
        if (body.username !== undefined)
            data.username = body.username;
        if (body.phone !== undefined)
            data.phone = body.phone;
        if (body.status !== undefined)
            data.status = body.status;
        if (body.role !== undefined)
            data.role = body.role;
        if (body.subscription !== undefined)
            data.subscription = body.subscription;
        if (body.avatar !== undefined)
            data.avatar = body.avatar;
        const updatedUser = await this.db.user.update({
            where: { id },
            data,
        });
        await this.db.auditLog.create({
            data: {
                userId: id,
                action: `updated user details: ${Object.keys(data).join(', ')}`,
                entityType: 'USER',
                entityId: id,
            },
        });
        return updatedUser;
    }
    async deleteUser(id) {
        await this.db.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        await this.db.auditLog.create({
            data: {
                userId: id,
                action: 'deleted user account',
                entityType: 'USER',
                entityId: id,
            },
        });
        return { success: true, message: 'User deleted successfully' };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('sortKey')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Get)('log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerLog", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "editUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteUser", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map