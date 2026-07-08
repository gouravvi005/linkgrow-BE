import { Controller, Get, Query, Param, NotFoundException, UseGuards, Patch, Body, Delete } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getCustomers(
    @Query('pageIndex') pageIndex = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortKey') sortKey = '',
    @Query('order') order = 'asc',
    @Query('query') query = '',
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

    const orderBy: any = {};
    if (sortKey) {
      // Mapping frontend totalSpending filter field to createdAt or default
      if (sortKey === 'totalSpending') {
        orderBy.createdAt = order.toLowerCase();
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
      totalSpending: u.subscription === 'pro' ? 19.00 : u.subscription === 'enterprise' ? 99.00 : 0.00,
      lastOnline: u.lastLogin ? Math.floor(u.lastLogin.getTime() / 1000) : Math.floor(u.createdAt.getTime() / 1000),
    }));

    return {
      list,
      total,
    };
  }

  @Get('log')
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

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Customer not found');
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

  @Patch(':id')
  async editUser(@Param('id') id: string, @Body() body: any) {
    const data: any = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.username !== undefined) data.username = body.username;
    if (body.phone !== undefined) data.phone = body.phone;
    if (body.status !== undefined) data.status = body.status;
    if (body.role !== undefined) data.role = body.role;
    if (body.subscription !== undefined) data.subscription = body.subscription;
    if (body.avatar !== undefined) data.avatar = body.avatar;

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

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
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
}
