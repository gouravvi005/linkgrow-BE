import { Controller, Post, Body, HttpCode, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { signInUserData } from '../mock-data/authData';

@Controller('mock/auth')
export class AuthController {
  private users = [...signInUserData];

  @Post('sign-up')
  signUp(@Body() body: any) {
    const { userName, email, password } = body;

    // Check if user already exists
    const existing = this.users.find((u) => u.email === email);
    if (existing) {
      return {
        status: 'success',
        message: 'Registration successful',
      };
    }

    // Store the new user so they can sign in immediately
    const newUser = {
      id: `user_${Date.now()}`,
      avatar: '/img/avatars/thumb-1.jpg',
      userName: userName || email.split('@')[0],
      email,
      authority: ['user'],
      password,
      accountUserName: (userName || email.split('@')[0]).toLowerCase().replace(/\s+/g, '_'),
    };
    this.users.push(newUser);

    return {
      status: 'success',
      message: 'Registration successful',
    };
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: any) {
    return {
      status: 'success',
      message: 'Password reset email sent',
    };
  }

  @Post('reset-password')
  resetPassword(@Body() body: any) {
    return {
      status: 'success',
      message: 'Password reset successful',
    };
  }

  @Post('save-username')
  saveUsername(@Body() body: any) {
    return {
      status: 'success',
      message: 'Username saved successfully',
    };
  }

  @Post('validate-credential')
  @HttpCode(HttpStatus.OK)
  validateCredential(@Body() body: any) {
    const { email, password } = body;
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
