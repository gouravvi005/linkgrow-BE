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
exports.LinksRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("../database/base.repository");
const database_service_1 = require("../database/database.service");
let LinksRepository = class LinksRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, db.link);
    }
    async findByProfileId(profileId) {
        return this.db.link.findMany({
            where: { profileId, deletedAt: null },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async clearCategory(categoryId) {
        return this.db.link.updateMany({
            where: { categoryId },
            data: { categoryId: null },
        });
    }
};
exports.LinksRepository = LinksRepository;
exports.LinksRepository = LinksRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], LinksRepository);
//# sourceMappingURL=links.repository.js.map