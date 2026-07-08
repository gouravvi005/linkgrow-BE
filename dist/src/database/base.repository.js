"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    db;
    model;
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }
    async create(data) {
        return this.model.create({ data });
    }
    async findById(id) {
        return this.model.findFirst({
            where: { id, deletedAt: null },
        });
    }
    async findMany(where = {}, options = {}) {
        return this.model.findMany({
            where: { ...where, deletedAt: null },
            ...options,
        });
    }
    async update(id, data) {
        return this.model.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
        return this.model.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.model.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
    async hardDelete(id) {
        return this.model.delete({
            where: { id },
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map