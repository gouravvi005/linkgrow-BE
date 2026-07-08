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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const commonData_1 = require("../mock-data/commonData");
const wildCardSearch_1 = __importDefault(require("../utils/wildCardSearch"));
let CommonController = class CommonController {
    getNotificationsCount() {
        const unreadNotification = commonData_1.notificationListData.filter((notification) => !notification.readed);
        return { count: unreadNotification.length };
    }
    getNotifications() {
        return commonData_1.notificationListData;
    }
    search(query = '') {
        if (!query) {
            return [];
        }
        const result = (0, wildCardSearch_1.default)(commonData_1.searchQueryPoolData, query, 'title');
        const categories = [];
        result.forEach((elm) => {
            if (!categories.includes(elm.categoryTitle)) {
                categories.push(elm.categoryTitle);
            }
        });
        const data = categories.map((category) => {
            return {
                title: category,
                data: result
                    .filter((elm) => elm.categoryTitle === category)
                    .filter((_, index) => index < 5),
            };
        });
        return data;
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Get)('notifications/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "getNotificationsCount", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "search", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)()
], CommonController);
//# sourceMappingURL=common.controller.js.map