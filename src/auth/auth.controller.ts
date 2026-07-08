import { Controller, All, Post, Req, Res, Body } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.authService.auth.api.signUpEmail({
        body: {
          email: body.email,
          password: body.password,
          name: body.userName || body.name || body.email.split('@')[0],
          username: body.userName || body.username || body.email.split('@')[0],
          phone: body.phone,
          provider: 'credentials',
          status: 'active',
          role: 'user',
          subscription: 'free',
        },
        asResponse: true,
      });

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      return res.status(response.status).json(await response.json());
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message || err });
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.authService.auth.api.signInEmail({
        body: {
          email: body.email,
          password: body.password,
        },
        asResponse: true,
      });

      // Update lastLogin timestamp in db
      try {
        const user = await this.authService.db.user.findFirst({
          where: { email: body.email },
        });
        if (user) {
          await this.authService.db.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });
        }
      } catch (dbErr) {
        console.error('Error updating lastLogin:', dbErr);
      }

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      return res.status(response.status).json(await response.json());
    } catch (err: any) {
      return res.status(401).json({ success: false, message: err.message || err });
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const headers = new Headers();
      Object.entries(req.headers).forEach(([key, val]) => {
        if (val) {
          headers.append(key, Array.isArray(val) ? val.join(',') : val);
        }
      });

      const response = await this.authService.auth.api.signOut({
        headers,
        asResponse: true,
      });

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      return res.status(response.status).json(await response.json());
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message || err });
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.authService.auth.api.forgetPassword({
        body: {
          email: body.email,
          redirectTo: body.redirectTo || 'http://localhost:3000/reset-password',
        },
        asResponse: true,
      });

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      return res.status(response.status).json(await response.json());
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message || err });
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.authService.auth.api.resetPassword({
        body: {
          newPassword: body.newPassword || body.password,
          token: body.token,
        },
        asResponse: true,
      });

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      return res.status(response.status).json(await response.json());
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message || err });
    }
  }

  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return this.authService.handler(req, res);
  }
}
