import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the controller response already matches our envelope, return as-is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }
        
        return {
          success: true,
          message: 'Operation completed successfully',
          data: data ?? {},
        };
      }),
    );
  }
}
