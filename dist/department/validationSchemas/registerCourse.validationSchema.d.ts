import { z, ZodType } from 'zod';
export declare const registerCourseValidationSchema: z.ZodObject<{
    courseId: ZodType<string | string[]>;
}, "strip", z.ZodTypeAny, {
    courseId?: ZodType<string | string[]>;
}, {
    courseId?: ZodType<string | string[]>;
}>;
export type RegisterCourseDto = Required<z.infer<typeof registerCourseValidationSchema>>;
