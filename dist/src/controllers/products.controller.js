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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const productData_1 = require("../mock-data/productData");
const paginate_1 = __importDefault(require("../utils/paginate"));
const sortBy_1 = __importDefault(require("../utils/sortBy"));
const wildCardSearch_1 = __importDefault(require("../utils/wildCardSearch"));
let ProductsController = class ProductsController {
    getProducts(pageIndex = '1', pageSize = '10', sortKey = '', order = 'asc', query = '') {
        const products = productData_1.productsData;
        let data = structuredClone(products);
        let total = products.length;
        if (sortKey) {
            if (sortKey === 'category' || sortKey === 'name') {
                data.sort((0, sortBy_1.default)(sortKey, order === 'desc', (a) => a.toUpperCase()));
            }
            else {
                data.sort((0, sortBy_1.default)(sortKey, order === 'desc', parseInt));
            }
        }
        if (query) {
            data = (0, wildCardSearch_1.default)(data, query, 'name');
            total = data.length;
        }
        data = (0, paginate_1.default)(data, parseInt(pageSize), parseInt(pageIndex));
        return {
            list: data,
            total,
        };
    }
    getProduct(id) {
        const product = productData_1.productsData.find((p) => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('sortKey')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products')
], ProductsController);
//# sourceMappingURL=products.controller.js.map