import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XssMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      req.body = this.sanitize(req.body);
    }
    if (req.query) {
      // req.query is a getter-only property in Express v5+ / newer Node.js versions.
      // Mutate the existing object in-place instead of reassigning.
      const sanitizedQuery = this.sanitize({ ...req.query });
      Object.keys(req.query).forEach((key) => delete (req.query as any)[key]);
      Object.assign(req.query, sanitizedQuery);
    }
    if (req.params) {
      // Same in-place mutation for req.params
      const sanitizedParams = this.sanitize({ ...req.params });
      Object.keys(req.params).forEach((key) => delete req.params[key]);
      Object.assign(req.params, sanitizedParams);
    }
    next();
  }

  private sanitize(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      if (typeof obj === 'string') {
        // Simple HTML entity encoding to neutralize scripts
        return obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
      return obj;
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = this.sanitize(obj[key]);
      }
    }
    return obj;
  }
}
