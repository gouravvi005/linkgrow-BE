"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveWorkspaceId = void 0;
const common_1 = require("@nestjs/common");
exports.ActiveWorkspaceId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const workspaceId = request.headers['x-workspace-id'];
    if (!workspaceId) {
        throw new common_1.BadRequestException('x-workspace-id header is required for this action');
    }
    return workspaceId;
});
//# sourceMappingURL=active-workspace.decorator.js.map