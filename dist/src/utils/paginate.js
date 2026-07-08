"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
exports.default = paginate;
//# sourceMappingURL=paginate.js.map