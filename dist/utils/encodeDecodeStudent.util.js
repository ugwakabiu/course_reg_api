"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeStudentId = exports.encodeStudentId = void 0;
const encodeStudentId = (id) => {
    return encodeURIComponent(id);
};
exports.encodeStudentId = encodeStudentId;
const decodeStudentId = (encodedId) => {
    return decodeURIComponent(encodedId);
};
exports.decodeStudentId = decodeStudentId;
//# sourceMappingURL=encodeDecodeStudent.util.js.map