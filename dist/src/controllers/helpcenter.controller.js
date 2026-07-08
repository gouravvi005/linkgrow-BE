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
exports.HelpCenterController = void 0;
const common_1 = require("@nestjs/common");
const helpCenterData_1 = require("../mock-data/helpCenterData");
const wildCardSearch_1 = __importDefault(require("../utils/wildCardSearch"));
const sortBy_1 = __importDefault(require("../utils/sortBy"));
const paginate_1 = __importDefault(require("../utils/paginate"));
let HelpCenterController = class HelpCenterController {
    articles = [...helpCenterData_1.articleListData];
    managedList = helpCenterData_1.articleList;
    getArticles(query = '', topic = '') {
        const list = [...this.articles];
        if (query) {
            return (0, wildCardSearch_1.default)(list, query);
        }
        if (topic) {
            return list.filter((article) => article.category === topic);
        }
        return list;
    }
    getCategories() {
        return {
            categories: helpCenterData_1.categoriesData,
            popularArticles: this.articles.filter((article) => article.starred),
        };
    }
    getManageArticles(pageIndex = '1', pageSize = '10', sortKey = '', order = 'asc', query = '', category) {
        const articles = this.managedList.getList();
        let data = structuredClone(articles);
        let total = articles.length;
        if (sortKey) {
            if (sortKey !== 'updateTimeStamp') {
                data.sort((0, sortBy_1.default)(sortKey, order === 'desc', (a) => a.toUpperCase()));
            }
            else {
                data.sort((0, sortBy_1.default)(sortKey, order === 'desc', parseInt));
            }
        }
        if (query) {
            data = (0, wildCardSearch_1.default)(data, query);
            total = data.length;
        }
        if (category) {
            const categories = category.split(',');
            data = data.filter((article) => categories.includes(article.category));
            total = data.length;
        }
        data = (0, paginate_1.default)(data, parseInt(pageSize), parseInt(pageIndex));
        return {
            list: data,
            total,
        };
    }
    getArticle(id) {
        const article = this.articles.find((a) => a.id === id);
        if (!article) {
            throw new common_1.NotFoundException('Article not found');
        }
        return {
            ...article,
            ...helpCenterData_1.articleDetailData,
        };
    }
    deleteArticles(body) {
        const { articleIds } = body;
        if (articleIds && Array.isArray(articleIds)) {
            this.articles = this.articles.filter((item) => !articleIds.includes(item.id));
            const filteredManaged = this.managedList.getList().filter((item) => !articleIds.includes(item.id));
            this.managedList.setList(filteredManaged);
        }
        return {};
    }
};
exports.HelpCenterController = HelpCenterController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HelpCenterController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelpCenterController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('manage'),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('sortKey')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('query')),
    __param(5, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], HelpCenterController.prototype, "getManageArticles", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HelpCenterController.prototype, "getArticle", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HelpCenterController.prototype, "deleteArticles", null);
exports.HelpCenterController = HelpCenterController = __decorate([
    (0, common_1.Controller)('helps/articles')
], HelpCenterController);
//# sourceMappingURL=helpcenter.controller.js.map