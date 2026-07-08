import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    login(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    handleAuth(req: Request, res: Response): Promise<void>;
}
