export declare class AuthController {
    private users;
    signUp(body: any): {
        status: string;
        message: string;
    };
    forgotPassword(body: any): {
        status: string;
        message: string;
    };
    resetPassword(body: any): {
        status: string;
        message: string;
    };
    saveUsername(body: any): {
        status: string;
        message: string;
    };
    validateCredential(body: any): {
        id: string;
        avatar: string;
        userName: string;
        email: string;
        authority: string[];
        password: string;
        accountUserName: string;
    };
}
