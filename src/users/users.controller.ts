import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { DatabaseService } from '@/database/database.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly db: DatabaseService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    const user = req.user;
    // Get full user details from DB
    const dbUser = await this.db.user.findUnique({
      where: { id: user.id },
    });
    return dbUser;
  }

  @Patch('me')
  async updateMe(@Req() req: any, @Body() body: any) {
    const user = req.user;
    const updatedUser = await this.db.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        username: body.username,
        phone: body.phone,
        avatar: body.avatar || body.image,
        image: body.avatar || body.image,
      },
    });
    return updatedUser;
  }
}
