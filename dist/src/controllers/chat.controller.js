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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chatData_1 = require("../mock-data/chatData");
const usersData_1 = require("../mock-data/usersData");
let ChatController = class ChatController {
    getConversation(id) {
        const conversation = chatData_1.conversationList.find((c) => c.id === id);
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
    getChatList() {
        return chatData_1.chatList;
    }
    getContacts() {
        const contactsId = ['4', '8', '6', '3', '2', '9'];
        const contacts = usersData_1.userDetailData.filter((user) => !contactsId.includes(user.id));
        return contacts;
    }
    getContact(id) {
        const groupsId = ['16', '17', '18'];
        const userDetails = groupsId.includes(id)
            ? chatData_1.groupsData.find((user) => user.id === id)
            : usersData_1.userDetailData.find((user) => user.id === id);
        if (!userDetails) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return userDetails;
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('conversations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Get)('chat/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getChatList", null);
__decorate([
    (0, common_1.Get)('contacts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Get)('contacts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getContact", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)()
], ChatController);
//# sourceMappingURL=chat.controller.js.map