"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordValidationSchema = void 0;
const zod_1 = require("zod");
exports.updatePasswordValidationSchema = zod_1.z
    .object({
    currentPassword: zod_1.z
        .string({
        required_error: 'Current password is required',
        invalid_type_error: 'Current password must be a string',
    })
        .min(6, 'Current password must be at least 6 characters long'),
    newPassword: zod_1.z
        .string({
        required_error: 'New password is required',
        invalid_type_error: 'New password must be a string',
    })
        .min(6, 'New password must be at least 6 characters long'),
    confirmPassword: zod_1.z
        .string({
        required_error: 'Confirm password is required',
        invalid_type_error: 'Confirm password must be a string',
    })
        .min(6, 'Confirm password must be at least 6 characters long'),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'],
});
//# sourceMappingURL=updatePassword.validationSchema.js.map