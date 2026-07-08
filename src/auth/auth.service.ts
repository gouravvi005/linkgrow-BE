import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@/database/database.service';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';

@Injectable()
export class AuthService implements OnModuleInit {
  public auth: any;

  constructor(
    public readonly db: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    const secret = this.config.get<string>('BETTER_AUTH_SECRET');
    const url = this.config.get<string>('BETTER_AUTH_URL');

    this.auth = betterAuth({
      database: prismaAdapter(this.db, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      socialProviders: {
        google: {
          clientId: this.config.get<string>('GOOGLE_AUTH_CLIENT_ID') || 'mock_google_id',
          clientSecret: this.config.get<string>('GOOGLE_AUTH_CLIENT_SECRET') || 'mock_google_secret',
        },
        github: {
          clientId: this.config.get<string>('GITHUB_AUTH_CLIENT_ID') || 'mock_github_id',
          clientSecret: this.config.get<string>('GITHUB_AUTH_CLIENT_SECRET') || 'mock_github_secret',
        },
      },
      user: {
        additionalFields: {
          username: { type: 'string', required: false },
          phone: { type: 'string', required: false },
          provider: { type: 'string', required: false },
          avatar: { type: 'string', required: false },
          status: { type: 'string', required: false },
          role: { type: 'string', required: false },
          subscription: { type: 'string', required: false },
          lastLogin: { type: 'date', required: false },
        },
      },
      secret,
      baseURL: url,
      basePath: '/api/v1/auth',
    });
  }

  async handler(req: Request, res: Response) {
    return toNodeHandler(this.auth)(req, res);
  }

  async getSession(req: Request) {
    // Convert Express/Node IncomingHttpHeaders to standard HeadersInit
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => headers.append(key, val));
      } else if (value) {
        headers.append(key, value);
      }
    });

    return this.auth.api.getSession({
      headers,
    });
  }
}
