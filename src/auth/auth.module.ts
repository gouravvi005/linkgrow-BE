import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { RbacGuard } from './guards/rbac.guard';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RbacGuard],
  exports: [AuthService, AuthGuard, RbacGuard],
})
export class AuthModule {}
