"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentValidationSchema = exports.createStudentValidationSchema = void 0;
const course_validationSchema_1 = require("../../course/validationSchema/course.validationSchema");
const zod_1 = require("zod");
const Gender = zod_1.z.enum(['male', 'female'], {
    required_error: 'gender is required',
    invalid_type_error: 'gender should be either male or female',
});
const MaritalStatus = zod_1.z.enum(['single', 'married'], {
    required_error: 'marital status is required',
    invalid_type_error: 'marital status should be either single or married',
});
exports.createStudentValidationSchema = zod_1.z.object({
    registrationNumber: zod_1.z.string({
        required_error: 'Registration number is required',
        invalid_type_error: 'Registration number must be a string',
    }),
    level: course_validationSchema_1.levelEnum,
    departmentId: zod_1.z.string({
        required_error: 'Department ID is required',
        invalid_type_error: 'Department ID must be a string',
    }),
    passport: zod_1.z.string().nullable().optional(),
    firstName: zod_1.z.string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
    }),
    lastName: zod_1.z.string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
    }),
    otherNames: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date({
        required_error: 'Date of birth is required',
        invalid_type_error: 'Invalid date format',
    }),
    gender: Gender,
    disability: zod_1.z.string({
        required_error: 'Disability information is required',
        invalid_type_error: 'Disability information must be a string',
    }),
    maritalStatus: MaritalStatus,
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Invalid email format',
    })
        .email({ message: 'Invalid email address' }),
    phoneNumber: zod_1.z
        .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
    })
        .min(10, { message: 'Phone number must be at least 10 characters' }),
    NIN: zod_1.z.string({
        required_error: 'NIN is required',
        invalid_type_error: 'NIN must be a string',
    }),
    state: zod_1.z.string({
        required_error: 'State is required',
        invalid_type_error: 'State must be a string',
    }),
    lga: zod_1.z.string({
        required_error: 'LGA is required',
        invalid_type_error: 'LGA must be a string',
    }),
    nationality: zod_1.z.string({
        required_error: 'Nationality is required',
        invalid_type_error: 'Nationality must be a string',
    }),
    contactAddress: zod_1.z.string({
        required_error: 'Contact address is required',
        invalid_type_error: 'Contact address must be a string',
    }),
});
exports.updateStudentValidationSchema = exports.createStudentValidationSchema.partial();
//# sourceMappingURL=student.validationSchema.js.map