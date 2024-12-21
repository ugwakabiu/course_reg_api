"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCourseValidationSchema = void 0;
const zod_1 = require("zod");
exports.registerCourseValidationSchema = zod_1.z.object({
    courseId: zod_1.z.any({ required_error: 'course id is required' }).refine((data) => {
        if (typeof data === 'string') {
            return true;
        }
        return (Array.isArray(data) && data.every((item) => typeof item === 'string'));
    }, {
        message: 'courseId should be a string or array of strings',
    }),
});
//# sourceMappingURL=registerCourse.validationSchema.js.map