import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async getUserById(id: string) {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createWorkspace(userId: string, name: string, slug: string) {
    // Check if slug is unique
    const existing = await this.db.workspace.findUnique({
      where: { slug },
    });
    if (existing) {
      throw new ConflictException('Workspace slug already in use');
    }

    return this.db.$transaction(async (tx) => {
      // Create workspace
      const workspace = await tx.workspace.create({
        data: {
          name,
          slug,
        },
      });

      // Ensure Owner role exists
      let ownerRole = await tx.role.findUnique({
        where: { name: 'OWNER' },
      });

      if (!ownerRole) {
        ownerRole = await tx.role.create({
          data: {
            name: 'OWNER',
            description: 'Workspace Owner with full privileges',
          },
        });
      }

      // Add user as OWNER membership
      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId,
          roleId: ownerRole.id,
        },
      });

      return workspace;
    });
  }

  async getWorkspacesForUser(userId: string) {
    return this.db.workspace.findMany({
      where: {
        members: {
          some: { userId },
        },
        deletedAt: null,
      },
      include: {
        members: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
