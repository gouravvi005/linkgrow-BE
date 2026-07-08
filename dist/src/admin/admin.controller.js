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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const active_workspace_decorator_1 = require("../auth/decorators/active-workspace.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const database_service_1 = require("../database/database.service");
const webhook_dto_1 = require("./dto/webhook.dto");
let AdminController = class AdminController {
    db;
    constructor(db) {
        this.db = db;
    }
    async getWebhooks(workspaceId) {
        return this.db.webhook.findMany({
            where: { workspaceId, deletedAt: null },
        });
    }
    async createWebhook(workspaceId, body) {
        return this.db.webhook.create({
            data: {
                workspaceId,
                url: body.url,
                secret: body.secret,
                events: body.events,
            },
        });
    }
    async updateWebhook(workspaceId, id, body) {
        const webhook = await this.db.webhook.findFirst({
            where: { id, workspaceId, deletedAt: null },
        });
        if (!webhook) {
            throw new common_1.NotFoundException('Webhook not found in this workspace');
        }
        return this.db.webhook.update({
            where: { id },
            data: body,
        });
    }
    async deleteWebhook(workspaceId, id) {
        const webhook = await this.db.webhook.findFirst({
            where: { id, workspaceId, deletedAt: null },
        });
        if (!webhook) {
            throw new common_1.NotFoundException('Webhook not found in this workspace');
        }
        return this.db.webhook.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getWebhooks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(webhook_dto_1.createWebhookSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createWebhook", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(webhook_dto_1.updateWebhookSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateWebhook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteWebhook", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin/webhooks'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map