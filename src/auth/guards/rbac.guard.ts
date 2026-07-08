import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/require-permission.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const memberships = request.memberships || [];
    
    // Extract workspaceId from header or request parameters/body
    const workspaceId =
      request.headers['x-workspace-id'] ||
      request.query['workspaceId'] ||
      request.body['workspaceId'] ||
      request.params['workspaceId'];

    if (!workspaceId) {
      throw new ForbiddenException('Workspace context header x-workspace-id is missing');
    }

    // Find membership for this workspace
    const membership = memberships.find((m: any) => m.workspaceId === workspaceId);
    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    // Support platform-level SUPERADMIN bypassing workspace permission checks
    if (membership.role.name === 'SUPERADMIN') {
      return true;
    }

    // Verify if the role has the required permission
    const hasPermission = membership.role.permissions.some(
      (rp: any) => rp.permission.name === requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException(`Missing required permission: ${requiredPermission}`);
    }

    return true;
  }
}
