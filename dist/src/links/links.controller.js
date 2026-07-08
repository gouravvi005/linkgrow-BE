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
exports.LinksController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const active_workspace_decorator_1 = require("../auth/decorators/active-workspace.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const links_service_1 = require("./links.service");
const link_dto_1 = require("./dto/link.dto");
let LinksController = class LinksController {
    linksService;
    constructor(linksService) {
        this.linksService = linksService;
    }
    async getLinks(workspaceId) {
        return this.linksService.getLinks(workspaceId);
    }
    async createLink(workspaceId, body) {
        return this.linksService.createLink(workspaceId, body);
    }
    async updateLink(workspaceId, id, body) {
        return this.linksService.updateLink(workspaceId, id, body);
    }
    async deleteLink(workspaceId, id) {
        return this.linksService.deleteLink(workspaceId, id);
    }
    async getCategories(workspaceId) {
        return this.linksService.getCategories(workspaceId);
    }
    async createCategory(workspaceId, body) {
        return this.linksService.createCategory(workspaceId, body);
    }
    async updateCategory(workspaceId, id, body) {
        return this.linksService.updateCategory(workspaceId, id, body);
    }
    async deleteCategory(workspaceId, id) {
        return this.linksService.deleteCategory(workspaceId, id);
    }
};
exports.LinksController = LinksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getLinks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(link_dto_1.createLinkSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "createLink", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(link_dto_1.updateLinkSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "updateLink", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "deleteLink", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(link_dto_1.createCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(link_dto_1.updateCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, active_workspace_decorator_1.ActiveWorkspaceId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "deleteCategory", null);
exports.LinksController = LinksController = __decorate([
    (0, common_1.Controller)('links'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
//# sourceMappingURL=links.controller.js.map