import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly db: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionResponse = await this.auth.getSession(request);

    if (!sessionResponse || !sessionResponse.user) {
      throw new UnauthorizedException('Authentication session invalid or expired');
    }

    request.user = sessionResponse.user;
    request.session = sessionResponse.session;

    // Resolve workspace memberships + roles + permissions for RBAC
    const memberships = await this.db.workspaceMember.findMany({
      where: { userId: sessionResponse.user.id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    request.memberships = memberships;

    return true;
  }
}
