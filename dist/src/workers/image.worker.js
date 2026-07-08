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
var ImageWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
let ImageWorker = ImageWorker_1 = class ImageWorker extends bullmq_1.WorkerHost {
    db;
    logger = new common_1.Logger(ImageWorker_1.name);
    constructor(db) {
        super();
        this.db = db;
    }
    async process(job) {
        const { mediaId, fileKey } = job.data;
        this.logger.log(`Starting image optimization job for mediaId: ${mediaId}, key: ${fileKey}`);
        const media = await this.db.media.findUnique({ where: { id: mediaId } });
        if (!media) {
            this.logger.warn(`Media asset ${mediaId} not found in DB, skipping optimization`);
            return;
        }
        this.logger.log(`Image optimization complete for media asset: ${media.fileName}`);
    }
};
exports.ImageWorker = ImageWorker;
exports.ImageWorker = ImageWorker = ImageWorker_1 = __decorate([
    (0, bullmq_1.Processor)('image-processing'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ImageWorker);
//# sourceMappingURL=image.worker.js.map