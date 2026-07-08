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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const logData_1 = require("../mock-data/logData");
let LogController = class LogController {
    getLogs(activityIndex = '1', filter) {
        const page = parseInt(activityIndex);
        let loadable = true;
        const maxGetItem = 3;
        const count = (page - 1) * maxGetItem;
        let logs = logData_1.logData;
        if (count >= logs.length) {
            loadable = false;
        }
        logs = logs.slice(count, page * maxGetItem);
        if (filter) {
            const filters = Array.isArray(filter) ? filter : [filter];
            logs = structuredClone(logs).map((log) => {
                log.events = log.events.filter((event) => filters.includes(event.type));
                return log;
            });
        }
        return {
            data: logs,
            loadable,
        };
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('activityIndex')),
    __param(1, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "getLogs", null);
exports.LogController = LogController = __decorate([
    (0, common_1.Controller)('logs')
], LogController);
//# sourceMappingURL=log.controller.js.map