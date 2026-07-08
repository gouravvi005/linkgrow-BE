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
exports.RbacGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const require_permission_decorator_1 = require("../decorators/require-permission.decorator");
let RbacGuard = class RbacGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.getAllAndOverride(require_permission_decorator_1.PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermission) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const memberships = request.memberships || [];
        const workspaceId = request.headers['x-workspace-id'] ||
            request.query['workspaceId'] ||
            request.body['workspaceId'] ||
            request.params['workspaceId'];
        if (!workspaceId) {
            throw new common_1.ForbiddenException('Workspace context header x-workspace-id is missing');
        }
        const membership = memberships.find((m) => m.workspaceId === workspaceId);
        if (!membership) {
            throw new common_1.ForbiddenException('You are not a member of this workspace');
        }
        if (membership.role.name === 'SUPERADMIN') {
            return true;
        }
        const hasPermission = membership.role.permissions.some((rp) => rp.permission.name === requiredPermission);
        if (!hasPermission) {
            throw new common_1.ForbiddenException(`Missing required permission: ${requiredPermission}`);
        }
        return true;
    }
};
exports.RbacGuard = RbacGuard;
exports.RbacGuard = RbacGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RbacGuard);
//# sourceMappingURL=rbac.guard.js.map