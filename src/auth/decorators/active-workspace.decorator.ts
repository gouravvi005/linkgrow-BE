import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const ActiveWorkspaceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const workspaceId = request.headers['x-workspace-id'];
    if (!workspaceId) {
      throw new BadRequestException('x-workspace-id header is required for this action');
    }
    return workspaceId;
  },
);
