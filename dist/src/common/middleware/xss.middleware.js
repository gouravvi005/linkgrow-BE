"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XssMiddleware = void 0;
const common_1 = require("@nestjs/common");
let XssMiddleware = class XssMiddleware {
    use(req, res, next) {
        if (req.body) {
            req.body = this.sanitize(req.body);
        }
        if (req.query) {
            const sanitizedQuery = this.sanitize({ ...req.query });
            Object.keys(req.query).forEach((key) => delete req.query[key]);
            Object.assign(req.query, sanitizedQuery);
        }
        if (req.params) {
            const sanitizedParams = this.sanitize({ ...req.params });
            Object.keys(req.params).forEach((key) => delete req.params[key]);
            Object.assign(req.params, sanitizedParams);
        }
        next();
    }
    sanitize(obj) {
        if (typeof obj !== 'object' || obj === null) {
            if (typeof obj === 'string') {
                return obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            return obj;
        }
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj[key] = this.sanitize(obj[key]);
            }
        }
        return obj;
    }
};
exports.XssMiddleware = XssMiddleware;
exports.XssMiddleware = XssMiddleware = __decorate([
    (0, common_1.Injectable)()
], XssMiddleware);
//# sourceMappingURL=xss.middleware.js.map