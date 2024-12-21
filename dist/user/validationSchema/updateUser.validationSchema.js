"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.updateUserValidationSchema = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: 'username is required',
        invalid_type_error: 'username should be string',
    })
        .optional(),
    password: zod_1.z
        .string({
        required_error: 'password is required',
        invalid_type_error: 'password should be string',
    })
        .min(6, { message: 'password should be at least 6 characters' })
        .optional(),
    active: zod_1.z
        .boolean({ invalid_type_error: 'active should be boolean' })
        .optional(),
});
//# sourceMappingURL=updateUser.validationSchema.js.map