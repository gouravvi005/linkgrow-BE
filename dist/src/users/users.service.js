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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    db;
    usersRepo;
    constructor(db, usersRepo) {
        this.db = db;
        this.usersRepo = usersRepo;
    }
    async getUserById(id) {
        const user = await this.usersRepo.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createWorkspace(userId, name, slug) {
        const existing = await this.db.workspace.findUnique({
            where: { slug },
        });
        if (existing) {
            throw new common_1.ConflictException('Workspace slug already in use');
        }
        return this.db.$transaction(async (tx) => {
            const workspace = await tx.workspace.create({
                data: {
                    name,
                    slug,
                },
            });
            let ownerRole = await tx.role.findUnique({
                where: { name: 'OWNER' },
            });
            if (!ownerRole) {
                ownerRole = await tx.role.create({
                    data: {
                        name: 'OWNER',
                        description: 'Workspace Owner with full privileges',
                    },
                });
            }
            await tx.workspaceMember.create({
                data: {
                    workspaceId: workspace.id,
                    userId,
                    roleId: ownerRole.id,
                },
            });
            return workspace;
        });
    }
    async getWorkspacesForUser(userId) {
        return this.db.workspace.findMany({
            where: {
                members: {
                    some: { userId },
                },
                deletedAt: null,
            },
            include: {
                members: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map