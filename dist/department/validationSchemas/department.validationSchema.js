"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentValidationSchema = exports.createDepartmentValidationSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'name should be string',
        required_error: 'name is required',
    })
        .min(2, 'department sholud be atleast 2 letters'),
});
exports.updateDepartmentValidationSchema = exports.createDepartmentValidationSchema.partial();
//# sourceMappingURL=department.validationSchema.js.map