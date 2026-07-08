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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mailData_1 = require("../mock-data/mailData");
let MailController = class MailController {
    getMailList(category, label) {
        let response = mailData_1.mailData;
        if (category && category !== 'inbox') {
            response = mailData_1.mailData.filter((mail) => mail.group === category);
        }
        if (label) {
            response = mailData_1.mailData.filter((mail) => mail.label === label);
        }
        return response;
    }
    getMailById(id) {
        const mail = mailData_1.mailData.find((m) => m.id === id);
        return mail || {};
    }
    getMailQuery(mailId) {
        if (mailId) {
            const mail = mailData_1.mailData.find((m) => m.id === mailId);
            return mail || {};
        }
        return mailData_1.mailData;
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "getMailList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "getMailById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('mail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "getMailQuery", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail')
], MailController);
//# sourceMappingURL=mail.controller.js.map