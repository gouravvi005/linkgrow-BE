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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const filesData_1 = require("../mock-data/filesData");
let FileController = class FileController {
    getFiles(id) {
        const directoryList = filesData_1.fileListData.filter((file) => file.fileType === 'directory');
        const directoryIdList = directoryList.map((directory) => directory.id);
        let list = filesData_1.fileListData;
        let filesIncluded = [];
        let directory = [];
        if (id && directoryList.some((dir) => dir.id === id)) {
            switch (id) {
                case '6':
                    filesIncluded = ['2', '7', '8', '9', '15', '16'];
                    break;
                case '12':
                    filesIncluded = ['1', '2', '5'];
                    break;
                case '18':
                    filesIncluded = ['11', '13', '7', '4'];
                    break;
                case '19':
                    filesIncluded = ['15', '17', '3', '8', '7'];
                    break;
                case '20':
                    filesIncluded = ['3', '4', '10', '14'];
                    break;
                default:
                    break;
            }
        }
        if (filesIncluded.length > 0) {
            list = filesData_1.fileListData.filter((file) => filesIncluded.includes(file.id));
            const dir = filesData_1.fileListData.find((file) => file.id === id);
            if (dir && directoryIdList.includes(id)) {
                directory = [{ id: dir.id, label: dir.name }];
            }
        }
        return {
            list,
            directory,
        };
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "getFiles", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('files')
], FileController);
//# sourceMappingURL=file.controller.js.map