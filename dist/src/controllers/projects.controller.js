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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projectsData_1 = require("../mock-data/projectsData");
const usersData_1 = require("../mock-data/usersData");
let ProjectsController = class ProjectsController {
    getProjects() {
        return projectsData_1.projectListData;
    }
    getScrumBoard() {
        return projectsData_1.scrumboardData;
    }
    getScrumBoardMembers() {
        const borderMembersId = ['3', '2', '4', '7', '1', '10', '9'];
        const participantMembers = usersData_1.usersData.filter((user) => borderMembersId.includes(user.id));
        return {
            participantMembers,
            allMembers: usersData_1.usersData,
        };
    }
    getTasks() {
        return projectsData_1.tasksData;
    }
    getTask(id) {
        return projectsData_1.issueData;
    }
    getProject(id) {
        let project = projectsData_1.projectListData.find((p) => p.id === id);
        if (!project) {
            project = projectsData_1.projectListData[0];
        }
        return {
            ...projectsData_1.projectDetailsData,
            ...project,
        };
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Get)('scrum-board'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getScrumBoard", null);
__decorate([
    (0, common_1.Get)('scrum-board/members'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getScrumBoardMembers", null);
__decorate([
    (0, common_1.Get)('tasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getTask", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects')
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map