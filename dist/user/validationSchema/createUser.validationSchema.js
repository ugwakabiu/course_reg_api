"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'username is required',
        invalid_type_error: 'username should be string',
    }),
    active: zod_1.z
        .boolean({ invalid_type_error: 'active should be boolean' })
        .optional(),
    password: zod_1.z
        .string({
        required_error: 'password is required',
        invalid_type_error: 'password should be string',
    })
        .min(6, { message: 'password should be at least 6 characters' }),
});
//# sourceMappingURL=createUser.validationSchema.js.map