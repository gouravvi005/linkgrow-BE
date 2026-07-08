"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const database_service_1 = require("../../database/database.service");
let AuthGuard = class AuthGuard {
    auth;
    db;
    constructor(auth, db) {
        this.auth = auth;
        this.db = db;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const sessionResponse = await this.auth.getSession(request);
        if (!sessionResponse || !sessionResponse.user) {
            throw new common_1.UnauthorizedException('Authentication session invalid or expired');
        }
        request.user = sessionResponse.user;
        request.session = sessionResponse.session;
        const memberships = await this.db.workspaceMember.findMany({
            where: { userId: sessionResponse.user.id },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        request.memberships = memberships;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        database_service_1.DatabaseService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map