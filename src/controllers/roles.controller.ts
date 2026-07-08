import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly db: DatabaseService) {}

  @Get('roles')
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

  @Get('users')
  async getUsers(
    @Query('pageIndex') pageIndex = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortKey') sortKey = '',
    @Query('order') order = 'asc',
    @Query('query') query = '',
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    const skip = (parseInt(pageIndex) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    const where: any = { deletedAt: null };
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

    const orderBy: any = {};
    if (sortKey) {
      if (sortKey === 'lastOnline') {
        orderBy.lastLogin = order.toLowerCase();
      } else {
        orderBy[sortKey] = order.toLowerCase();
      }
    } else {
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
}
