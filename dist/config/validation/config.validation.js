"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfigValidation = void 0;
const course_validationSchema_1 = require("../../course/validationSchema/course.validationSchema");
const zod_1 = require("zod");
exports.updateConfigValidation = zod_1.z.object({
    session: zod_1.z.string({
        invalid_type_error: 'session should be string',
        required_error: 'session is required',
    }),
    current_semester: course_validationSchema_1.SemesterEnum,
    allow_login: zod_1.z.boolean({
        invalid_type_error: 'allow login should be boolean',
        required_error: 'allow login is required',
    }),
    allow_data_update: zod_1.z.boolean({
        invalid_type_error: 'allow data update should be boolean',
        required_error: 'allow data update is required',
    }),
});
//# sourceMappingURL=config.validation.js.map